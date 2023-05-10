import { Favorite, UsedItem, UsedItemImage, User } from "@prisma/client";
import client from "../lib/prismadb";
import { UsedItemWithImgComFav } from "../type";

type Props = {
  email: string;
  skip?: number;
};
export type UserItem = User & {
  favorites: Favorite[];
  usedItems: UsedItemWithImgComFav[];
  nextSkip: number;
};

const getUserItems = async ({ email, skip = 0 }: Props) => {
  if (!email) return null;
  try {
    const response = (await client.user.findUnique({
      where: { email: email },
      include: {
        usedItems: {
          take: 15,
          skip,
          include: {
            favorites: true,
            images: true,
            comments: true,
          },
        },
        favorites: true,
      },
    })) as UserItem;

    response.nextSkip = skip > 0 ? skip + 15 : 0;
    return response;
  } catch (e) {
    return null;
  }
};

export default getUserItems;
