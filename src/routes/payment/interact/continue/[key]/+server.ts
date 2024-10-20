import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { completeInteract } from "$lib/server/payments/interact";

export const GET: RequestHandler = async ({ url, params }) => {
  const { key } = params;

  const hash = url.searchParams.get("hash");
  if (!hash) return error(400);

  const interactRef = url.searchParams.get("interact_ref");
  if (!interactRef) return error(400);

  completeInteract(key, interactRef);

  return redirect(303, "/");
};
