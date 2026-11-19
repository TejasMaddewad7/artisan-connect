import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, avatar, role = "CUSTOMER" } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const assignedRole = (role?.toUpperCase() || "CUSTOMER") as Role;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        artisan: true,
        addresses: {
          where: { isDefault: true },
          take: 1,
        },
      },
    });

    if (!user) {
      // Create new user from Google profile
      user = await prisma.user.create({
        data: {
          name: name || email.split("@")[0],
          email: email.toLowerCase().trim(),
          avatar: avatar || null,
          role: assignedRole,
        },
        include: {
          artisan: true,
          addresses: {
            where: { isDefault: true },
            take: 1,
          },
        },
      });
    } else {
      // If user exists and explicitly selected a specific role (e.g. ARTISAN / ADMIN)
      if (assignedRole === "ADMIN" || assignedRole === "ARTISAN") {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            role: assignedRole,
            avatar: avatar || user.avatar,
            name: name || user.name,
          },
          include: {
            artisan: true,
            addresses: {
              where: { isDefault: true },
              take: 1,
            },
          },
        });
      }
    }

    // If role is ARTISAN and user has no artisan profile yet, auto-create one
    if (user.role === "ARTISAN" && !user.artisan) {
      const baseSlug = user.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const artisanProfile = await prisma.artisanProfile.create({
        data: {
          userId: user.id,
          shopName: `${user.name}'s Studio`,
          slug: `${baseSlug}-${Date.now().toString().slice(-4)}`,
          bio: "Independent craft artist & handmade studio.",
          avatar: user.avatar,
          city: "India",
          state: "All India",
        },
      });
      user = { ...user, artisan: artisanProfile };
    }

    const defaultAddress = user.addresses?.[0] || null;

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || undefined,
        avatar: user.avatar || undefined,
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
          : undefined,
      },
    });
  } catch (error) {
    console.error("Google Auth error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}
