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
var clerkClient_exports = {};
__export(clerkClient_exports, {
  clerkClient: () => clerkClient
});
module.exports = __toCommonJS(clerkClient_exports);
var import_backend = require("@clerk/backend");
var import_constants = require("./constants");
const clerkClient = (0, import_backend.createClerkClient)({
  secretKey: import_constants.SECRET_KEY,
  publishableKey: import_constants.PUBLISHABLE_KEY,
  apiUrl: import_constants.API_URL,
  apiVersion: import_constants.API_VERSION,
  userAgent: `${"@clerk/nextjs"}@${"5.1.4"}`,
  proxyUrl: import_constants.PROXY_URL,
  domain: import_constants.DOMAIN,
  isSatellite: import_constants.IS_SATELLITE,
  sdkMetadata: import_constants.SDK_METADATA,
  telemetry: {
    disabled: import_constants.TELEMETRY_DISABLED,
    debug: import_constants.TELEMETRY_DEBUG
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clerkClient
});
//# sourceMappingURL=clerkClient.js.map