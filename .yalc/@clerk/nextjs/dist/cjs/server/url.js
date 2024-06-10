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
var url_exports = {};
__export(url_exports, {
  isDevAccountPortalOrigin: () => isDevAccountPortalOrigin
});
module.exports = __toCommonJS(url_exports);
var import_url = require("@clerk/shared/url");
const accountPortalCache = /* @__PURE__ */ new Map();
function isDevAccountPortalOrigin(hostname) {
  if (!hostname) {
    return false;
  }
  let res = accountPortalCache.get(hostname);
  if (res === void 0) {
    res = (0, import_url.isLegacyDevAccountPortalOrigin)(hostname) || (0, import_url.isCurrentDevAccountPortalOrigin)(hostname);
    accountPortalCache.set(hostname, res);
  }
  return res;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isDevAccountPortalOrigin
});
//# sourceMappingURL=url.js.map