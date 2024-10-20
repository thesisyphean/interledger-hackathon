const callbacks = new Map<string, (interactRef: string) => Promise<void>>();

export function registerInteract(key: string, callback: (interactRef: string) => Promise<void>) {
  callbacks.set(key, callback);
}

export async function completeInteract(nonce: string, interactRef: string): Promise<void> {
  const callback = callbacks.get(nonce);
  if (callback) {
    await callback(interactRef);
  }
}
