import { serve } from "inngest/next";

import { inngest } from "@/app/inngest/inngest.client";

import {
  trickleCreateClerkUser,
  batchCreateClerkUser,
} from "@/app/inngest/functions/create-clerk-user";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [trickleCreateClerkUser, batchCreateClerkUser],
});
