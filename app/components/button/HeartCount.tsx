"use client";

import { Favorite, User } from "@prisma/client";
import HeartButton from "./HeartButton";
import { CurrentUserFavorites } from "@/app/type";

type Props = {
  count: Favorite[];
  usedItemId: string;
  currentUser?: CurrentUserFavorites;
  big?: boolean;
};

const HeartCount = ({ count, currentUser, usedItemId, big }: Props) => {
  return (
    <div className={`flex items-center gap-1 ${big && "gap-2 text-xl"}`}>
      <HeartButton usedItemId={usedItemId} currentUser={currentUser} />
      <div className="font-thin text-neutral-500">{count.length}</div>
    </div>
  );
};

export default HeartCount;
