"use client";

import { useEffect, useState } from "react";
import styles from "./responsive-banner.module.css";

// Exact 728×90 and 320×50 GET CODE supplied for this site's Adsterra units.
const units = {
  desktop: {
    key: "162e43f333e17450c06fff9989597f71",
    src: "https://bauval.org/22/162e43f333e17450c06fff9989597f71",
    width: 728,
    height: 90,
  },
  mobile: {
    key: "9f0108995cc2b5ca4a25e1e1d1280a37",
    src: "https://bauval.org/22/9f0108995cc2b5ca4a25e1e1d1280a37",
    width: 320,
    height: 50,
  },
} as const;

type Device = keyof typeof units;

function iframeDocument(device: Device): string {
  const unit = units[device];
  // The banner provider may use document.write. Execute the original code
  // inside a lightweight same-origin document to keep the main React page safe.
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden;width:100%;height:100%;}</style></head><body><script>atOptions = {'key' : '${unit.key}', 'format' : 'iframe', 'height' : ${unit.height}, 'width' : ${unit.width}, 'params' : {}};<\/script><script src="${unit.src}"><\/script></body></html>`;
}

export function ResponsiveBanner() {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => setDevice(query.matches ? "desktop" : "mobile");
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <aside className={styles.banner} aria-label="Advertisement">
      <p className={styles.label}>Advertisement</p>
      <div className={styles.frame}>
        {device ? (
          <iframe
            key={device}
            title="Advertisement"
            srcDoc={iframeDocument(device)}
            width={units[device].width}
            height={units[device].height}
            scrolling="no"
            loading="eager"
            className={styles.iframe}
          />
        ) : null}
      </div>
    </aside>
  );
}
