"use client";
import { ClerkProvider as ReactClerkProvider } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useTransition } from "react";
import { useSafeLayoutEffect } from "../../client-boundary/hooks/useSafeLayoutEffect";
import { ClerkNextOptionsProvider } from "../../client-boundary/NextOptionsContext";
import { ClerkJSScript } from "../../utils/clerk-js-script";
import { mergeNextClerkPropsWithEnv } from "../../utils/mergeNextClerkPropsWithEnv";
import { useAwaitablePush } from "./useAwaitablePush";
import { useAwaitableReplace } from "./useAwaitableReplace";
const ClientClerkProvider = (props) => {
  const { __unstable_invokeMiddlewareOnAuthStateChange = true, children } = props;
  const router = useRouter();
  const push = useAwaitablePush();
  const replace = useAwaitableReplace();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    var _a;
    if (!isPending) {
      (_a = window.__clerk_internal_invalidateCachePromise) == null ? void 0 : _a.call(window);
    }
  }, [isPending]);
  useSafeLayoutEffect(() => {
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
  const mergedProps = mergeNextClerkPropsWithEnv({
    ...props,
    routerPush: push,
    routerReplace: replace
  });
  return /* @__PURE__ */ React.createElement(ClerkNextOptionsProvider, { options: mergedProps }, /* @__PURE__ */ React.createElement(ReactClerkProvider, { ...mergedProps }, /* @__PURE__ */ React.createElement(ClerkJSScript, { router: "app" }), children));
};
export {
  ClientClerkProvider
};
//# sourceMappingURL=ClerkProvider.js.map