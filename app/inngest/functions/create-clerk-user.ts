import { clerkClient } from "@clerk/clerk-sdk-node";
import type { User } from "@clerk/clerk-sdk-node";
import { inngest } from "../inngest.client";
export const trickleCreateClerkUser = inngest.createFunction(
  {
    id: "create-clerk-user",
    name: "Create Clerk User",
    concurrency: [{ limit: 1, key: "event.data.external_id" }],
    throttle: {
      limit: 2,
      period: "10s",
    },
  },
  { event: "migration/create-clerk-user" },
  async ({ event, step }) => {
    const { email, hashed_password, external_id } = event.data;

    const { editedUser } = await updatePotentialUser(
      external_id,
      email,
      hashed_password
    );

    if (editedUser) {
      return JSON.stringify({ editedUser });
    }

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

async function updatePotentialUser(
  external_id: string,
  email: string,
  hashed_password: string
) {
  const findUser = await clerkClient.users.getUserList({
    externalId: [external_id],
  });

  if (findUser.totalCount >= 2) {
    throw new Error("There are more than 2 users with the same external_id");
  }

  if (findUser.totalCount === 1) {
    const existingUser = findUser.data[0];

    if (
      !existingUser.emailAddresses.some(
        (emailObj) => emailObj.emailAddress === email
      )
    ) {
      throw new Error(
        "The provided email does not match any existing user emails, and we cannot modify the clerk email address"
      );
    }

    const editedUser = await clerkClient.users.updateUser(existingUser.id, {
      passwordDigest: hashed_password,
      passwordHasher: "bcrypt",
      skipPasswordChecks: true,
    });

    return { editedUser };
  }

  return { editedUser: undefined };
}
