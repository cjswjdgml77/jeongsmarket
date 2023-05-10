import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/lib/prismadb";
import { UsedItemWithImgComFav } from "@/app/type";
import { Favorite, UsedItem, UsedItemImage, User } from "@prisma/client";
import { NextResponse } from "next/server";
import next from "next/types";

type IParams = {
  params: {
    take: string;
  };
};

export type UserItem = User & {
  usedItems: UsedItemWithImgComFav[];
  nextSkip: boolean;
};
export async function GET(req: Request, { params }: IParams) {
  const nextTake = parseInt(params.take, 10);
  try {
    const currenUser = await getCurrentUser();
    if (!currenUser || !currenUser.email)
      return new Response("", {
        status: 403,
        statusText: "Please login to get your lists",
      });
    const response = (await client.user.findUnique({
      where: {
        email: currenUser.email,
      },

      include: {
        usedItems: {
          take: nextTake,
          include: {
            images: true,
            favorites: true,
            comments: true,
          },
        },
      },
    })) as UserItem;
    if (response && response.usedItems.length < nextTake)
      response.nextSkip = false;
    else if (response && response.usedItems.length === nextTake)
      response.nextSkip = true;

    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.error();
  }
}
