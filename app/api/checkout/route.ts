import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { firstName, lastName, email, phone, address, city, state, zipCode } = data

    // 1️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 mins

    // 2️⃣ Create or update user
    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          password: Math.random().toString(36).slice(-8), // temp password
          otp,
          otpExpiresAt,
          isVerified: false,
        },
      })
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt },
      })
    }

    // 3️⃣ Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Planet T" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Planet T Order OTP Verification",
      html: `<p>Hello ${firstName},</p><p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
    })

    return NextResponse.json({ success: true, userId: user.id })
  } catch (error) {
    console.error("Checkout API Error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
