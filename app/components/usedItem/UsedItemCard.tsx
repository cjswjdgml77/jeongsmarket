"use client";
import {
  Comment,
  Favorite,
  UsedItem,
  UsedItemImage,
  User,
} from "@prisma/client";
import Image from "next/image";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import HeartButton from "../button/HeartButton";
import { useRouter } from "next/navigation";
type Props = {
  data: UsedItem & {
    images: UsedItemImage[];
    comments: Comment[];
    favorites: Favorite[];
  };
  currentUser?: (User & { favorites: Favorite[] }) | null;
};

const UsedItemCard = ({ data, currentUser }: Props) => {
  const router = useRouter();
  return (
    <div
      className="
        relative
        grid-cols-1
        group
        flex
        flex-col
        gap-1
    "
    >
      <div
        className="
                    aspect-square
                    h-[25vh]
                    rounded-lg
                    relative
                    overflow-hidden
                "
      >
        <Image
          className="w-full h-full relative group-hover:scale-110 transitio cursor-pointer"
          alt={data.title}
          src={data.images[0].secure_url}
          fill
          onClick={() => {
            router.push(`/useditem/${data.id}`);
          }}
        />
      </div>

      <div className="font-semibold text-lg">{data.title}</div>
      <span className="p-2 rounded-md bg-slate-300 text-right">
        ${data.price}
      </span>
      <div>
        <BiMap />
        {data.address}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <HeartButton usedItemId={data.id} currentUser={currentUser} />
          <div className="font-thin text-neutral-500">
            {data.favorites.length}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <BsChat />
          <div className="font-thin text-neutral-500">
            {data.comments.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedItemCard;
