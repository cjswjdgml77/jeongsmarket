import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

type IParams = {
  params: { params: string[] };
};
export async function GET(req: Request, { params }: IParams) {
  const commentId = params.params[0];
  const take = parseInt(params.params[1], 10);
  console.log(take);
  if (!take || isNaN(take))
    return new Response("", { status: 400, statusText: "Bad Request" });
  try {
    const response = await client.comment.findMany({
      where: {
        usedItemId: commentId,
      },
      take,
      include: { user: true },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
  return NextResponse.json(params);
}
