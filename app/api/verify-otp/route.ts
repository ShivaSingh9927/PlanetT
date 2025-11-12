import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.otp || user.otp !== otp)
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 400 })

    if (user.otpExpiresAt && user.otpExpiresAt < new Date())
      return NextResponse.json({ success: false, message: "OTP expired" }, { status: 400 })

    await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
