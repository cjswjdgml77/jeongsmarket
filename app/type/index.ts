import {
  Comment,
  Favorite,
  UsedItem,
  UsedItemImage,
  User,
} from "@prisma/client";
import { IconType } from "react-icons";

export interface Category {
  label: string;
  icon: IconType;
}

export type CurrentUserFavorites = (User & { favorites: Favorite[] }) | null;

export type UsedItemWithImgComFav = UsedItem & {
  images: UsedItemImage[];
  comments: Comment[];
  favorites: Favorite[];
};
