import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { NextRequest } from "next/server";

export interface User {
  id: number;
  name: string
  email: string
  role: "user" | "admin"
}

export interface JWTPayload {
  userId: number
  email: string
  role: "user" | "admin"
}

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-jwt-secret-key"

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error: unknown) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get("token")?.value
  return token || null
}

export function requireAuth(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null

  return verifyToken(token)
}

export function requireAdmin(request: NextRequest): JWTPayload | null {
  const user = requireAuth(request)
  if (!user || user.role !== "admin") return null

  return user
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
