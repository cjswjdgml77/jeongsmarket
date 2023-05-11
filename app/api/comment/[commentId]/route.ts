import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    commentId: string;
  };
};
export async function DELETE(req: Request, { params }: IParams) {
  const { commentId } = params;
  if (!commentId) return NextResponse.error();
  try {
    const response = await client.comment.delete({
      where: { id: commentId },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function GET(req: Request, { params }: IParams) {
  console.log(params);
  const { commentId } = params;
  try {
    const response = await client.comment.findMany({
      where: {
        usedItemId: commentId,
      },
      include: { user: true },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}
