"use strict";
"use client";
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
var hooks_exports = {};
__export(hooks_exports, {
  EmailLinkErrorCode: () => import_errors.EmailLinkErrorCode,
  isClerkAPIResponseError: () => import_errors.isClerkAPIResponseError,
  isEmailLinkError: () => import_errors.isEmailLinkError,
  isKnownError: () => import_errors.isKnownError,
  isMetamaskError: () => import_errors.isMetamaskError,
  useAuth: () => import_clerk_react.useAuth,
  useClerk: () => import_clerk_react.useClerk,
  useEmailLink: () => import_clerk_react.useEmailLink,
  useOrganization: () => import_clerk_react.useOrganization,
  useOrganizationList: () => import_clerk_react.useOrganizationList,
  useSession: () => import_clerk_react.useSession,
  useSessionList: () => import_clerk_react.useSessionList,
  useSignIn: () => import_clerk_react.useSignIn,
  useSignUp: () => import_clerk_react.useSignUp,
  useUser: () => import_clerk_react.useUser
});
module.exports = __toCommonJS(hooks_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_errors = require("@clerk/clerk-react/errors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailLinkErrorCode,
  isClerkAPIResponseError,
  isEmailLinkError,
  isKnownError,
  isMetamaskError,
  useAuth,
  useClerk,
  useEmailLink,
  useOrganization,
  useOrganizationList,
  useSession,
  useSessionList,
  useSignIn,
  useSignUp,
  useUser
});
//# sourceMappingURL=hooks.js.map