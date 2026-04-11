import crypto from "node:crypto";
import env from "../config/env.js";

const activeTokens = new Map();

const getTokenTtlMinutes = () => {
  const ttl = Number(env.AUTH_TOKEN_TTL_MINUTES);
  if (!Number.isFinite(ttl) || ttl <= 0) {
    return 120;
  }
  return ttl;
};

const clearExpiredTokens = () => {
  const now = Date.now();
  for (const [token, session] of activeTokens.entries()) {
    if (session.expiresAt <= now) {
      activeTokens.delete(token);
    }
  }
};

export const generateAccessToken = (subject = "api-client") => {
  clearExpiredTokens();

  const token = crypto.randomBytes(32).toString("hex");
  const ttlMinutes = getTokenTtlMinutes();
  const expiresAt = Date.now() + ttlMinutes * 60 * 1000;

  activeTokens.set(token, {
    subject,
    createdAt: Date.now(),
    expiresAt,
  });

  return {
    token,
    tokenType: "Bearer",
    expiresAt: new Date(expiresAt).toISOString(),
    expiresInMinutes: ttlMinutes,
  };
};

export const validateAccessToken = (token) => {
  clearExpiredTokens();
  const session = activeTokens.get(token);

  if (!session) {
    return { valid: false };
  }

  return {
    valid: true,
    subject: session.subject,
    expiresAt: session.expiresAt,
  };
};
