import { login } from "$lib/server/login";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    // const data = await request.formData();
    // const email = data.get('email');
    // const password = data.get('password');
    //
    // if (!email || typeof email !== "string") {
    //   return fail(422);
    // }
    // if (!password || typeof password !== "string") {
    //   return fail(422);
    // }
    //
    // const session = login(email, password);
    // if (session === null) {
    //   return fail(400);
    // }
    //
    // cookies.set('session', session, { path: '/' });
  }
};
