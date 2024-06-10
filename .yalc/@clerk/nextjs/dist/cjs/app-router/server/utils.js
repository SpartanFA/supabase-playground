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
var utils_exports = {};
__export(utils_exports, {
  buildRequestLike: () => buildRequestLike
});
module.exports = __toCommonJS(utils_exports);
var import_server = require("next/server");
const isPrerenderingBailout = (e) => {
  if (!(e instanceof Error) || !("message" in e)) {
    return false;
  }
  const { message } = e;
  const lowerCaseInput = message.toLowerCase();
  const dynamicServerUsage = lowerCaseInput.includes("dynamic server usage");
  const bailOutPrerendering = lowerCaseInput.includes("this page needs to bail out of prerendering");
  const routeRegex = /Route .*? needs to bail out of prerendering at this point because it used .*?./;
  return routeRegex.test(message) || dynamicServerUsage || bailOutPrerendering;
};
const buildRequestLike = () => {
  try {
    const { headers } = require("next/headers");
    return new import_server.NextRequest("https://placeholder.com", { headers: headers() });
  } catch (e) {
    if (e && isPrerenderingBailout(e)) {
      throw e;
    }
    throw new Error(
      `Clerk: auth() and currentUser() are only supported in App Router (/app directory).
If you're using /pages, try getAuth() instead.
Original error: ${e}`
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildRequestLike
});
//# sourceMappingURL=utils.js.map