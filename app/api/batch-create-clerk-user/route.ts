import { inngest } from "@/app/inngest/inngest.client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.array(
  z.object({
    email: z.string(),
    hashed_password: z.string(),
    external_id: z.string(),
  })
);

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (!req.body) {
    return NextResponse.json({ message: "No body" }, { status: 400 });
  }
  const users = schema.parse(await req.json());

  await Promise.all(
    users.map((user) => {
      const { email, hashed_password, external_id } = user;
      return inngest.send({
        name: "migration/batch/create-clerk-user",
        data: {
          email,
          hashed_password,
          external_id,
        },
      });
    })
  );

  return NextResponse.json({ message: `${users.length} users queued` });
};
