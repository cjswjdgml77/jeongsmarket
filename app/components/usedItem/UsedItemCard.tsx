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
import HeartCount from "./HeartCount";
import { motion } from "framer-motion";
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
      <motion.div
        className="
                    aspect-square
                    h-[25vh]
                    rounded-lg
                    relative
                    overflow-hidden
                "
      >
        <Image
          className="group-hover:scale-110 transitio cursor-pointer w-full h-full"
          alt={data.title}
          src={data.images[0].secure_url}
          width={300}
          height={300}
          onClick={() => {
            router.push(`/useditem/${data.id}`);
          }}
        />
      </motion.div>

      <div className="font-semibold text-lg">{data.title}</div>
      <div className="text-right justify-end text-neutral-400 text-sm w-full flex flex-wrap">
        {data.category.map((category, idx) => (
          <span key={category}>
            {category}
            {data.category.length > idx + 1 && ","}
          </span>
        ))}
      </div>
      <span className="px-2 rounded-md text-right">${data.price}</span>
      <div>
        <BiMap />
        {data.address}
      </div>
      <div className="flex items-center gap-3">
        <HeartCount
          count={data.favorites}
          usedItemId={data.id}
          currentUser={currentUser}
        />

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
