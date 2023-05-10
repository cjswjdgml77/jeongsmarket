import client from "@/app/lib/prismadb";
import { AxiosError } from "axios";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.error();
    }
    const user = await client.user.findUnique({
      where: { email },
    });

    if (user)
      return new Response("", {
        status: 406,
        statusText: "The email is already exists",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await client.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(createdUser);
  } catch (e) {
    return NextResponse.error();
  }
}
