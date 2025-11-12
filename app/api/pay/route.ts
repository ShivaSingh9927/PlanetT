import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isVerified) {
      return NextResponse.json({ success: false, message: "User not verified" });
    }

    // Simulate payment success
    await prisma.order.create({
      data: {
        userEmail: email,
        amount: 499,
        status: "PAID",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Payment failed" }, { status: 500 });
  }
}
