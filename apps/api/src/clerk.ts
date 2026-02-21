import { verifyToken } from "@clerk/backend";
import type { FastifyRequest } from "fastify";
import { env } from "./env.js";

export interface AuthResult {
  userId: string | null;
}

export async function getAuth(req: FastifyRequest): Promise<AuthResult> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return { userId: null };
  }

  const token = authHeader.slice(7);

  try {
    const verified = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
    });
    return { userId: verified.sub };
  } catch {
    return { userId: null };
  }
}
