import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const data = verifyToken(token);
  if (!data) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user: data });
}
