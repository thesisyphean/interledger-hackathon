import { signup } from "$lib/server/sessions";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');
    const url = data.get("url");

    if (!firstName || typeof firstName !== "string") {
      return fail(422);
    }
    if (!lastName || typeof lastName !== "string") {
      return fail(422);
    }
    if (!email || typeof email !== "string") {
      return fail(422);
    }
    if (!password || typeof password !== "string") {
      return fail(422);
    }
    if (!url || typeof url !== "string") {
      return fail(422);
    }
    
    const session = signup(firstName, lastName, email, password, url);

    cookies.set('session', session, { path: '/' });
    return redirect(303, "/")
  }
};
