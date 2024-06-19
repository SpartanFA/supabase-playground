import { clerkClient } from "@clerk/clerk-sdk-node";
import { inngest } from "../inngest.client";
export const trickleCreateClerkUser = inngest.createFunction(
  {
    id: "trickle-create-clerk-user",
    name: "Trickle Create Clerk User",
    concurrency: 5,
    throttle: {
      limit: 5,
      period: "10s",
    },
  },
  { event: "migration/trickle/create-clerk-user" },
  async ({ event, step }) => {
    const { email, hashed_password, external_id } = event.data;

    await clerkClient.users.createUser({
      externalId: external_id,
      emailAddress: [email],
      password: hashed_password,
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    return "User Created";
  }
);

export const batchCreateClerkUser = inngest.createFunction(
  {
    id: "batch-create-clerk-user",
    name: "Batch Create Clerk User",
    concurrency: 10,
    throttle: {
      limit: 10,
      period: "10s",
    },
  },
  { event: "migration/batch/create-clerk-user" },
  async ({ event, step }) => {
    const { email, hashed_password, external_id } = event.data;

    await clerkClient.users.createUser({
      externalId: external_id,
      emailAddress: [email],
      password: hashed_password,
      skipPasswordChecks: true,
      skipPasswordRequirement: true,
    });

    return `User created`;
  }
);
