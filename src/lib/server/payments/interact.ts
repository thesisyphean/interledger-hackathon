import { redirect } from "@sveltejs/kit";

const callbacks = new Map<string, (interactRef: string) => Promise<string>>();

export function registerInteract(key: string, callback: (interactRef: string) => Promise<string>) {
  callbacks.set(key, callback);
}

export async function completeInteract(nonce: string, interactRef: string): Promise<string | null> {
  const callback = callbacks.get(nonce);
  if (callback) {
    redirect(303, await callback(interactRef));
  } else {
    return null;
  }
}
