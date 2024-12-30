import bcrypt from "bcrypt";
import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { email, password } = result.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return cleaned user object
    const cleanUser = {
      id: user.id,
      email: user.email,
    };

    return NextResponse.json(
      { user: cleanUser },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: Error | unknown) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
