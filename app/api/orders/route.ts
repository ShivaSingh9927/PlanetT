import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, address, city, postalCode, state, country } = data;

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // ✅ Hash a temporary password (based on phone or fallback)
    const hashedPassword = await bcrypt.hash(phone || "defaultpass", 10);

    // ✅ Create or update user with OTP
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          otp,
          otpExpiresAt,
          isVerified: false,
        },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt },
      });
    }

    // ✅ Send OTP email via Resend
    if (process.env.NODE_ENV === "production") {
      const { data: sent, error } = await resend.emails.send({
        from: "Planet T <orders@planett.store>",
        to: email,
        subject: "Your Planet T Order Verification",
        text: `Your OTP for order verification is ${otp}. It expires in 10 minutes.`,
      });

      if (error) {
        console.error("❌ Email send failed:", error);
        throw new Error("Email send failed");
      }

      console.log("✅ OTP email sent via Resend:", sent?.id);
    } else {
      // Local dev fallback
      console.log(`📩 [DEV MODE] OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent to email for verification.",
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
