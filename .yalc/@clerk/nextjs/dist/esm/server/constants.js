import { apiUrlFromPublishableKey } from "@clerk/shared/apiUrlFromPublishableKey";
import { isTruthy } from "@clerk/shared/underscore";
const CLERK_JS_VERSION = process.env.NEXT_PUBLIC_CLERK_JS_VERSION || "";
const CLERK_JS_URL = process.env.NEXT_PUBLIC_CLERK_JS_URL || "";
const API_VERSION = process.env.CLERK_API_VERSION || "v1";
const SECRET_KEY = process.env.CLERK_SECRET_KEY || "";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const API_URL = process.env.CLERK_API_URL || apiUrlFromPublishableKey(PUBLISHABLE_KEY);
const DOMAIN = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "";
const PROXY_URL = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "";
const IS_SATELLITE = isTruthy(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false;
const SIGN_IN_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
const SIGN_UP_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
const SDK_METADATA = {
  name: "@clerk/nextjs",
  version: "5.1.4",
  environment: process.env.NODE_ENV
};
const TELEMETRY_DISABLED = isTruthy(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED);
const TELEMETRY_DEBUG = isTruthy(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG);
export {
  API_URL,
  API_VERSION,
  CLERK_JS_URL,
  CLERK_JS_VERSION,
  DOMAIN,
  IS_SATELLITE,
  PROXY_URL,
  PUBLISHABLE_KEY,
  SDK_METADATA,
  SECRET_KEY,
  SIGN_IN_URL,
  SIGN_UP_URL,
  TELEMETRY_DEBUG,
  TELEMETRY_DISABLED
};
//# sourceMappingURL=constants.js.map