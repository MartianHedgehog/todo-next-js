import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { RegistrationSchema } from "@/components/RegistrationForm/schema";
import { ZodError } from "zod";
import { getError } from "@/utils/getError";

export async function POST(req: Request) {
  try {
    const { name, email, password } = RegistrationSchema.parse(
      await req.json()
    );

    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    //@ts-expect-error - Prisma error
    if (getError(error).code === "P2002") {
      return NextResponse.json(
        {
          status: "fail",
          message: "user with that email already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: getError(error).message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
