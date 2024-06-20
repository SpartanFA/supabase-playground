import { clerkClient } from "@clerk/clerk-sdk-node";
import { inngest } from "../inngest.client";
export const trickleCreateClerkUser = inngest.createFunction(
  {
    id: "create-clerk-user",
    name: "Create Clerk User",
    concurrency: [{ limit: 1, key: "event.data.external_id" }],
    priority: {
      run: "event.data.is_batch ? 0 : 600", // if you are batch you run last.
    },
    throttle: {
      limit: 2,
      period: "10s",
    },
  },
  { event: "migration/create-clerk-user" },
  async ({ event, step }) => {
    const { email, hashed_password, external_id } = event.data;

    const newUser = await clerkClient.users.createUser({
      externalId: external_id,
      emailAddress: [email],
      passwordDigest: hashed_password,
      passwordHasher: "bcrypt",
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    return JSON.stringify(newUser);
  }
);
