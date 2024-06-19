import { EventSchemas, Inngest, type LiteralZodEventSchema } from "inngest";
import { z } from "zod";

// Define each event individually
const productPurchasedEvent = z.object({
  name: z.literal("migration/trickle/create-clerk-user"),
  data: z.object({
    email: z.string(),
    hashed_password: z.string(),
    external_id: z.string(),
  }),
}) satisfies LiteralZodEventSchema;

// You can use satisfies to provide some autocomplete when writing the event
const productViewedEvent = z.object({
  name: z.literal("migration/batch/create-clerk-user"),
  data: z.object({
    email: z.string(),
    hashed_password: z.string(),
    external_id: z.string(),
  }),
}) satisfies LiteralZodEventSchema;

export const inngest = new Inngest({
  id: "12345",
  schemas: new EventSchemas().fromZod([
    productPurchasedEvent,
    productViewedEvent,
  ]),
});
