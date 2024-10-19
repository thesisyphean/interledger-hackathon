import crypto from "node:crypto";
import { getUsers } from "../database/users";

interface Session {
  userId: string;
  expiry: number;
}

const sessions = new Map<string, Session>();

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

export function check_session(session: string | undefined): string | null {
  if (!session) return null;

  const s = sessions.get(session);
  if (s === undefined) return null;

  const now = Date.now();
  if (s.expiry < now) {
    sessions.delete(session);
    return null;
  }

  s.expiry = now + SESSION_MAX_AGE;

  return s.userId;
}

export async function login(email: string, password: string): Promise<string | null> {
  // HACK: fixme
  const user = (await getUsers())[0];

  const session = crypto.randomBytes(16).toString("base64");
  sessions.set(session, {
    userId: user.userId,
    expiry: Date.now() + SESSION_MAX_AGE,
  });

  return session;
}

export function logout(session: string) {
  sessions.delete(session);
}
