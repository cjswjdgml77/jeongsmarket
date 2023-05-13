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
import { BiMap } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { useRouter } from "next/navigation";
import HeartCount from "../button/HeartCount";
import { motion } from "framer-motion";
import { CurrentUserFavorites, UsedItemWithImgComFav } from "@/app/type";
import CommentCount from "../button/CommentCount";
type Props = {
  data: UsedItemWithImgComFav;
  currentUser?: CurrentUserFavorites;
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
                  rounded-lg
                  relative
                  overflow-hidden
              "
      >
        <Image
          className="group-hover:scale-110 transitio cursor-pointer w-full h-full aspect-square"
          alt={data.title}
          src={data.images[0].secure_url}
          width={400}
          height={400}
          onClick={() => {
            router.push(`/useditem/${data.id}`);
          }}
        />
      </div>

      <div className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
        {data.title}
      </div>
      <div className="text-right justify-end text-neutral-400 text-sm w-full flex flex-wrap">
        {data.category.map((category, idx) => (
          <span key={category}>
            {category}
            {data.category.length > idx + 1 && ","}
          </span>
        ))}
      </div>
      <span className="px-2 rounded-md text-right">${data.price}</span>

      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        <BiMap className="inline-block" /> {data.address}
      </p>
      <div className="flex items-center gap-3">
        <HeartCount
          count={data.favorites}
          usedItemId={data.id}
          currentUser={currentUser}
        />

        <CommentCount usedItemId={data.id} comments={data.comments} />
      </div>
    </div>
  );
};

export default UsedItemCard;
