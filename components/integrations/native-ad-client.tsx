"use client";

import { useEffect, useRef } from "react";

export function NativeAdClient({ scriptUrl, containerId }: { scriptUrl: string; containerId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Deferring DOM insertion by one frame makes React Strict Mode's effect
    // setup/cleanup replay harmless: the cancelled first pass never requests ads.
    const frame = window.requestAnimationFrame(() => {
      const container = document.createElement("div");
      container.id = containerId;
      host.appendChild(container);

      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = scriptUrl;
      script.dataset.gameWikiNativeAd = containerId;
      host.appendChild(script);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      host.replaceChildren();
    };
  }, [containerId, scriptUrl]);

  return <div ref={hostRef} data-native-ad-slot />;
}
