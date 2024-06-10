"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ClerkProvider_exports = {};
__export(ClerkProvider_exports, {
  ClientClerkProvider: () => ClientClerkProvider
});
module.exports = __toCommonJS(ClerkProvider_exports);
var import_clerk_react = require("@clerk/clerk-react");
var import_navigation = require("next/navigation");
var import_react = __toESM(require("react"));
var import_useSafeLayoutEffect = require("../../client-boundary/hooks/useSafeLayoutEffect");
var import_NextOptionsContext = require("../../client-boundary/NextOptionsContext");
var import_clerk_js_script = require("../../utils/clerk-js-script");
var import_mergeNextClerkPropsWithEnv = require("../../utils/mergeNextClerkPropsWithEnv");
var import_useAwaitablePush = require("./useAwaitablePush");
var import_useAwaitableReplace = require("./useAwaitableReplace");
const ClientClerkProvider = (props) => {
  const { __unstable_invokeMiddlewareOnAuthStateChange = true, children } = props;
  const router = (0, import_navigation.useRouter)();
  const push = (0, import_useAwaitablePush.useAwaitablePush)();
  const replace = (0, import_useAwaitableReplace.useAwaitableReplace)();
  const [isPending, startTransition] = (0, import_react.useTransition)();
  (0, import_react.useEffect)(() => {
    var _a;
    if (!isPending) {
      (_a = window.__clerk_internal_invalidateCachePromise) == null ? void 0 : _a.call(window);
    }
  }, [isPending]);
  (0, import_useSafeLayoutEffect.useSafeLayoutEffect)(() => {
    window.__unstable__onBeforeSetActive = () => {
      return new Promise((res) => {
        window.__clerk_internal_invalidateCachePromise = res;
        startTransition(() => {
          router.refresh();
        });
      });
    };
    window.__unstable__onAfterSetActive = () => {
      if (__unstable_invokeMiddlewareOnAuthStateChange) {
        return router.refresh();
      }
    };
  }, []);
  const mergedProps = (0, import_mergeNextClerkPropsWithEnv.mergeNextClerkPropsWithEnv)({
    ...props,
    routerPush: push,
    routerReplace: replace
  });
  return /* @__PURE__ */ import_react.default.createElement(import_NextOptionsContext.ClerkNextOptionsProvider, { options: mergedProps }, /* @__PURE__ */ import_react.default.createElement(import_clerk_react.ClerkProvider, { ...mergedProps }, /* @__PURE__ */ import_react.default.createElement(import_clerk_js_script.ClerkJSScript, { router: "app" }), children));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClientClerkProvider
});
//# sourceMappingURL=ClerkProvider.js.map