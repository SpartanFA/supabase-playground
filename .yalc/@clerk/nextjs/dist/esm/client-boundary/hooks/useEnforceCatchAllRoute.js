import { isProductionEnvironment } from "@clerk/shared";
import React from "react";
import { useSession } from "../hooks";
import { usePagesRouter } from "./usePagesRouter";
const useEnforceCatchAllRoute = (component, path, routing, requireSessionBeforeCheck = true) => {
  const ref = React.useRef(0);
  const { pagesRouter } = usePagesRouter();
  const { session, isLoaded } = useSession();
  if (isProductionEnvironment()) {
    return;
  }
  React.useEffect(() => {
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
export {
  useEnforceCatchAllRoute
};
//# sourceMappingURL=useEnforceCatchAllRoute.js.map