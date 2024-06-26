import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, request, event) => {
  return await updateSession(request);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/batch-create-clerk-user|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  // matcher: [
  //   /*
  //    * Match all request paths except:
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
  //    * Feel free to modify this pattern to include more paths.
  //    */
  //   "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  // ],
};
