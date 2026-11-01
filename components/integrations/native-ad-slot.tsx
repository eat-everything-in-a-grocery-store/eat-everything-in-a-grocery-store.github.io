import { integrations } from "@/config/integrations";
import { NativeAdClient } from "./native-ad-client";

export function NativeAdSlot() {
  if (integrations.ads.provider !== "adsterra-native") return null;

  return (
    <aside aria-label="Advertisement" className="my-7 min-w-0">
      <p className="mb-2 text-center text-[10px] tracking-widest opacity-60">Advertisement</p>
      <NativeAdClient
        scriptUrl={integrations.ads.scriptUrl}
        containerId={integrations.ads.containerId}
      />
    </aside>
  );
}
