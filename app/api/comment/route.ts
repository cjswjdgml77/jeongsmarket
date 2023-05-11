import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.email)
    return new Response("", { status: 401, statusText: "Unauthorized" });
  if (!body || !body.usedItemId || !body.content)
    return new Response("", { status: 400, statusText: "Bad Request" });
  try {
    const response = await client.comment.create({
      data: {
        content: body.content,
        userId: currentUser.id,
        usedItemId: body.usedItemId,
      },
      include: { user: true },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (!body || !body.commentId || !body.content)
    return new Response("", { status: 400, statusText: "Bad Request" });
  try {
    const response = await client.comment.update({
      where: {
        id: body.commentId,
      },
      data: {
        content: body.content,
      },
    });

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}
