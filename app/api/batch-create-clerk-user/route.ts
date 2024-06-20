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
        name: "migration/create-clerk-user",
        data: {
          is_batch: true,
          email,
          hashed_password,
          external_id,
        },
      });
    })
  );

  return NextResponse.json(
    { message: `${users.length} users queued` },
    { status: 200 }
  );
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json({ message: "test" }, { status: 200 });
};
