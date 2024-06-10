"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var constants_exports = {};
__export(constants_exports, {
  API_URL: () => API_URL,
  API_VERSION: () => API_VERSION,
  CLERK_JS_URL: () => CLERK_JS_URL,
  CLERK_JS_VERSION: () => CLERK_JS_VERSION,
  DOMAIN: () => DOMAIN,
  IS_SATELLITE: () => IS_SATELLITE,
  PROXY_URL: () => PROXY_URL,
  PUBLISHABLE_KEY: () => PUBLISHABLE_KEY,
  SDK_METADATA: () => SDK_METADATA,
  SECRET_KEY: () => SECRET_KEY,
  SIGN_IN_URL: () => SIGN_IN_URL,
  SIGN_UP_URL: () => SIGN_UP_URL,
  TELEMETRY_DEBUG: () => TELEMETRY_DEBUG,
  TELEMETRY_DISABLED: () => TELEMETRY_DISABLED
});
module.exports = __toCommonJS(constants_exports);
var import_apiUrlFromPublishableKey = require("@clerk/shared/apiUrlFromPublishableKey");
var import_underscore = require("@clerk/shared/underscore");
const CLERK_JS_VERSION = process.env.NEXT_PUBLIC_CLERK_JS_VERSION || "";
const CLERK_JS_URL = process.env.NEXT_PUBLIC_CLERK_JS_URL || "";
const API_VERSION = process.env.CLERK_API_VERSION || "v1";
const SECRET_KEY = process.env.CLERK_SECRET_KEY || "";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const API_URL = process.env.CLERK_API_URL || (0, import_apiUrlFromPublishableKey.apiUrlFromPublishableKey)(PUBLISHABLE_KEY);
const DOMAIN = process.env.NEXT_PUBLIC_CLERK_DOMAIN || "";
const PROXY_URL = process.env.NEXT_PUBLIC_CLERK_PROXY_URL || "";
const IS_SATELLITE = (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE) || false;
const SIGN_IN_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "";
const SIGN_UP_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || "";
const SDK_METADATA = {
  name: "@clerk/nextjs",
  version: "5.1.4",
  environment: process.env.NODE_ENV
};
const TELEMETRY_DISABLED = (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DISABLED);
const TELEMETRY_DEBUG = (0, import_underscore.isTruthy)(process.env.NEXT_PUBLIC_CLERK_TELEMETRY_DEBUG);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=constants.js.map