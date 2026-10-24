import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        artisan: {
          select: {
            id: true,
            shopName: true,
            slug: true,
            avatar: true,
            isVerified: true,
          },
        },
        addresses: {
          where: { isDefault: true },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 401 }
      );
    }

    // Check password
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "This account does not have a password set. Please contact support." },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const defaultAddress = user.addresses[0] || null;

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        artisan: user.artisan || null,
        address: defaultAddress
          ? {
              fullName: defaultAddress.fullName,
              phone: defaultAddress.phone,
              email: user.email,
              addressLine1: defaultAddress.addressLine1,
              city: defaultAddress.city,
              state: defaultAddress.state,
              pincode: defaultAddress.pincode,
            }
          : null,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong during login" },
      { status: 500 }
    );
  }
}
