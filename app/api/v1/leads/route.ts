import { type NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { contactEmailSchema } from "@/lib/zod";

export async function POST(
  req: NextRequest,
  _ctx: RouteContext<"/api/v1/leads">
) {
  const payload = await getPayload({ config: configPromise });
  const body = await req.json();

  const validation = contactEmailSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.message, { status: 400 });
  }

  try {
    const lead = await payload.create({
      collection: "leads",
      data: {
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
        message: validation.data.message,
      },
      req: {
        context: {
          isWebSource: true,
        },
      },
    });
    return NextResponse.json({ lead: lead.id }, { status: 201 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
