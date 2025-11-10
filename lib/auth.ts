import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "supersecretkey"; // use env var in production

export function createToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" }); // 7-day expiry
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete("token");
}
