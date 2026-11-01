"use client";

import { useEffect } from "react";

const src = "https://bauval.org/14/1f2560b73991c6dec397383ae7a7fdbd";

export function SocialBar() {
  useEffect(() => {
    // RootLayout persists across App Router navigation; leave this script in
    // place until the browser document unloads, including Strict Mode replays.
    if (document.querySelector('script[data-adsterra-social-bar="true"]')) return;
    const script = document.createElement("script");
    script.async = false;
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-adsterra-social-bar", "true");
    script.src = src;
    document.body.appendChild(script);
  }, []);

  return null;
}
