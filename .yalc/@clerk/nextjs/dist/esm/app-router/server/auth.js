import { constants, createClerkRequest, createRedirect } from "@clerk/backend/internal";
import { notFound, redirect } from "next/navigation";
import { buildClerkProps } from "../../server/buildClerkProps";
import { PUBLISHABLE_KEY, SIGN_IN_URL, SIGN_UP_URL } from "../../server/constants";
import { createGetAuth } from "../../server/createGetAuth";
import { authAuthHeaderMissing } from "../../server/errors";
import { createProtect } from "../../server/protect";
import { getAuthKeyFromRequest } from "../../server/utils";
import { buildRequestLike } from "./utils";
const auth = () => {
  const request = buildRequestLike();
  const authObject = createGetAuth({
    debugLoggerName: "auth()",
    noAuthStatusMessage: authAuthHeaderMissing()
  })(request);
  const clerkUrl = getAuthKeyFromRequest(request, "ClerkUrl");
  const redirectToSignIn = (opts = {}) => {
    const clerkRequest = createClerkRequest(request);
    const devBrowserToken = clerkRequest.clerkUrl.searchParams.get(constants.QueryParameters.DevBrowser) || clerkRequest.cookies.get(constants.Cookies.DevBrowser);
    return createRedirect({
      redirectAdapter: redirect,
      devBrowserToken,
      baseUrl: clerkRequest.clerkUrl.toString(),
      // TODO: Support runtime-value configuration of these options
      // via setting and reading headers from clerkMiddleware
      publishableKey: PUBLISHABLE_KEY,
      signInUrl: SIGN_IN_URL,
      signUpUrl: SIGN_UP_URL
    }).redirectToSignIn({
      returnBackUrl: opts.returnBackUrl === null ? "" : opts.returnBackUrl || (clerkUrl == null ? void 0 : clerkUrl.toString())
    });
  };
  const protect = createProtect({ request, authObject, redirectToSignIn, notFound, redirect });
  return Object.assign(authObject, { protect, redirectToSignIn });
};
const initialState = () => {
  return buildClerkProps(buildRequestLike());
};
export {
  auth,
  initialState
};
//# sourceMappingURL=auth.js.map