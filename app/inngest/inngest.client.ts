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

export const inngest = new Inngest({
  id: "12345",
  schemas: new EventSchemas().fromZod([createClerkUserEvent]),
});
