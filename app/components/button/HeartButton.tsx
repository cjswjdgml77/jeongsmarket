"use client";

import useFavorite from "@/app/hooks/useFavorite";
import { Favorite, User } from "@prisma/client";
import { useCallback } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
type Props = {
  usedItemId: string;
  currentUser?: (User & { favorites: Favorite[] }) | null;
};

const HeartButton = ({ usedItemId, currentUser }: Props) => {
  const { isMyFavorite, toggleFavorite, isLoading } = useFavorite(
    usedItemId,
    currentUser
  );
  return (
    <div
      className={`${isLoading ? "pointer-events-none" : "cursor-pointer"} `}
      onClick={toggleFavorite}
    >
      <AiOutlineHeart className="absolute" />
      <AiFillHeart
        className={`${
          isMyFavorite() ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
};

export default HeartButton;
