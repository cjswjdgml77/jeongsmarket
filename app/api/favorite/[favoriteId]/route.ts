import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  params: {
    favoriteId: string;
  };
}
export async function POST(req: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();
    const { favoriteId } = params;
    if (!currentUser)
      return new Response("", { status: 401, statusText: "Unauthorized" });

    const response = await client.usedItem.update({
      where: { id: favoriteId },
      data: {
        favorites: {
          create: {
            userId: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();
    const { favoriteId } = params;
    if (!currentUser)
      return new Response("", { status: 401, statusText: "Unauthorized" });

    const response = await client.favorite.delete({
      where: { id: favoriteId },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}
