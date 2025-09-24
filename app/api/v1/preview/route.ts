import type { NextRequest } from "next/server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type CollectionSlug, getPayload, type PayloadRequest } from "payload";

import configPromise from "@payload-config";

import { getServerSideURL } from "@/lib/get-url";

export async function GET(
  req: NextRequest,
  _ctx: RouteContext<"/api/v1/preview">
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });

  const { searchParams } = new URL(req.url);

  const slug = searchParams.get("slug");
  const collection = searchParams.get("collection") as CollectionSlug;
  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (!(path && collection && slug)) {
    return new Response("Insufficient search params", { status: 404 });
  }

  if (!path.startsWith("/")) {
    return new Response(
      "This endpoint can only be used for relative previews",
      {
        status: 500,
      }
    );
  }

  // biome-ignore lint/suspicious/noExplicitAny: no necessary
  let user: any;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
  } catch (error) {
    payload.logger.error(
      { err: error },
      "Error verifying token for live preview"
    );
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  draft.enable();

  const basePath = getServerSideURL();
  redirect(`${basePath}${path}`);
}
