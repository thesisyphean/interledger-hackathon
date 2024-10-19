import crypto from "node:crypto";

interface Session {
  user_uuid: string;
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

  return s.user_uuid;
}

export function login(email: string, password: string): string | null {
  const user_uuid = "1";

  const session = crypto.randomBytes(16).toString("base64");
  sessions.set(session, {
    user_uuid,
    expiry: Date.now() + SESSION_MAX_AGE,
  });

  return session;
}

export function logout(session: string) {
  sessions.delete(session);
}
