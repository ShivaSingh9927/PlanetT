import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

    if (user.otp !== otp) return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
    if (new Date() > new Date(user.otpExpiresAt))
      return NextResponse.json({ error: "OTP expired." }, { status: 400 });

    await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });

    return NextResponse.json({ message: "Email verified! Order confirmed." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
