import { EventSchemas, Inngest, type LiteralZodEventSchema } from "inngest";
import { z } from "zod";

// Define each event individually
const createClerkUserEvent = z.object({
  name: z.literal("migration/create-clerk-user"),
  data: z.object({
    email: z.string(),
    hashed_password: z.string(),
    external_id: z.string(),
    is_batch: z.boolean(),
  }),
}) satisfies LiteralZodEventSchema;

if (!process.env.INNGEST_APP_ID) {
  throw new Error("INNGEST_APP_ID is not set");
}

export const inngest = new Inngest({
  id: process.env.INNGEST_APP_ID,
  schemas: new EventSchemas().fromZod([createClerkUserEvent]),
});
