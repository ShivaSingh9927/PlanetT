import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { createToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const token = createToken({ id: user.id, email: user.email });
  setAuthCookie(token);

  return NextResponse.json({ message: "Signup successful", user: { id: user.id, email: user.email } });
}
