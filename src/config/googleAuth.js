import { writeFileSync } from "fs";

export function initGoogleAuth() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    
    return;
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error("❌ GOOGLE_SERVICE_ACCOUNT_JSON missing");
  }

  const credsPath = "/tmp/gcp-key.json";

  writeFileSync(
    credsPath,
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  );

  process.env.GOOGLE_APPLICATION_CREDENTIALS = credsPath;

  
}
