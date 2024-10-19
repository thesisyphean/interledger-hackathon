import { logout } from "$lib/server/sessions";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ cookies }) => {
    const session = cookies.get("session");
    if (session) {
      logout(session);
    }
  }
};
