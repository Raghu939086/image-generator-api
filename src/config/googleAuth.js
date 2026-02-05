import fs from "fs";
import path from "path";

export function initGoogleAuth() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Already set (local dev)
    return;
  }

  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

  if (!base64) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is missing");
  }

  const json = Buffer.from(base64, "base64").toString("utf8");

  const credPath = path.join("/tmp", "service-account.json");

  fs.writeFileSync(credPath, json);

  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;

  console.log("✅ Google credentials written to:", credPath);
}
