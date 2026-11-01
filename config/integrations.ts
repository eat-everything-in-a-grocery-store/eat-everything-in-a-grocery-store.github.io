import type { IntegrationConfig } from "./types";
import generatedIntegrationsRaw from "../content/generated/integrations.json";

type GeneratedIntegrations = {
  gaMeasurementId?: string | null;
  bingSiteVerification?: string | null;
};

const generatedIntegrations = generatedIntegrationsRaw as GeneratedIntegrations;

const gaFromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const gaFromGenerated = typeof generatedIntegrations.gaMeasurementId === "string"
  ? generatedIntegrations.gaMeasurementId.trim()
  : "";
const gaMeasurementId = gaFromEnv || gaFromGenerated || "";

const bingFromEnv = process.env.BING_SITE_VERIFICATION?.trim() || "";
const bingFromGenerated = typeof generatedIntegrations.bingSiteVerification === "string"
  ? generatedIntegrations.bingSiteVerification.trim()
  : "";
const bingVerification = bingFromEnv || bingFromGenerated || null;

export const integrations: IntegrationConfig = {
  analytics: /^G-[A-Z0-9]+$/i.test(gaMeasurementId)
    ? { provider: "google-analytics", measurementId: gaMeasurementId.toUpperCase() }
    : { provider: "none" },
  // Exact Native Banner GET CODE for this website; never inherit another site's environment secrets.
  ads: {
    provider: "adsterra-native",
    scriptUrl: "https://bauval.org/21/dc15047a4073598989ab59aeb2f66200",
    containerId: "container-dc15047a4073598989ab59aeb2f66200",
  },
  verification: {
    bing: bingVerification,
  },
};
