"use strict";
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
var useEnforceCatchAllRoute_exports = {};
__export(useEnforceCatchAllRoute_exports, {
  useEnforceCatchAllRoute: () => useEnforceCatchAllRoute
});
module.exports = __toCommonJS(useEnforceCatchAllRoute_exports);
var import_shared = require("@clerk/shared");
var import_react = __toESM(require("react"));
var import_hooks = require("../hooks");
var import_usePagesRouter = require("./usePagesRouter");
const useEnforceCatchAllRoute = (component, path, routing, requireSessionBeforeCheck = true) => {
  const ref = import_react.default.useRef(0);
  const { pagesRouter } = (0, import_usePagesRouter.usePagesRouter)();
  const { session, isLoaded } = (0, import_hooks.useSession)();
  if ((0, import_shared.isProductionEnvironment)()) {
    return;
  }
  import_react.default.useEffect(() => {
    if (!isLoaded || routing && routing !== "path") {
      return;
    }
    if (requireSessionBeforeCheck && !session) {
      return;
    }
    const ac = new AbortController();
    const error = () => {
      const correctPath = pagesRouter ? `${path}/[[...index]].tsx` : `${path}/[[...rest]]/page.tsx`;
      throw new Error(
        `
Clerk: The <${component}/> component is not configured correctly. The most likely reasons for this error are:

1. The "${path}" route is not a catch-all route.
It is recommended to convert this route to a catch-all route, eg: "${correctPath}". Alternatively, you can update the <${component}/> component to use hash-based routing by setting the "routing" prop to "hash".

2. The <${component}/> component is mounted in a catch-all route, but all routes under "${path}" are protected by the middleware.
To resolve this, ensure that the middleware does not protect the catch-all route or any of its children. If you are using the "createRouteMatcher" helper, consider adding "(.*)" to the end of the route pattern, eg: "${path}(.*)". For more information, see: https://clerk.com/docs/references/nextjs/clerk-middleware#create-route-matcher
`
      );
    };
    if (pagesRouter) {
      if (!pagesRouter.pathname.match(/\[\[\.\.\..+]]/)) {
        error();
      }
    } else {
      const check = async () => {
        ref.current++;
        if (ref.current > 1) {
          return;
        }
        let res;
        try {
          const url = `${window.location.origin}${window.location.pathname}/${component}_clerk_catchall_check_${Date.now()}`;
          res = await fetch(url, { signal: ac.signal });
        } catch (e) {
        }
        if ((res == null ? void 0 : res.status) === 404) {
          error();
        }
      };
      void check();
    }
    return () => {
      if (ref.current > 1) {
        ac.abort();
      }
    };
  }, [isLoaded]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useEnforceCatchAllRoute
});
//# sourceMappingURL=useEnforceCatchAllRoute.js.map