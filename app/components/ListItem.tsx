import { Favorite, UsedItem, UsedItemImage } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { category } from "./Input/CategoryContainer";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import HeartCount from "./button/HeartCount";
import { CurrentUserFavorites, UsedItemWithImgComFav } from "../type";
import CommentCount from "./button/CommentCount";
type Props = {
  list: UsedItemWithImgComFav;
  currentUser?: CurrentUserFavorites;
};

const ListItem = ({ list, currentUser }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const router = useRouter();
  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.start("initial");
    }
  }, [isInView, controls]);
  const variants = {
    initial: {
      opacity: 0,
      x: 400,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate={controls}
      ref={ref}
      onClick={() => {
        router.push(`/useditem/${list.id}`);
      }}
      className="
            flex
            flex-col
            md:flex-row
            border-2
            rounded-lg
            px-5
            py-4
            items-center
            gap-4
            cursor-pointer
            shadow-md
            hover:shadow-lg
            hover:scale-150
            "
    >
      <div className="w-full md:w-20 md:h-16 md:min-w-[5rem]">
        <Image
          src={list.images[0].secure_url}
          alt={list.title}
          width={300}
          height={300}
          className="w-full h-full rounded-md aspect-square"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <p className="flex flex-wrap">{list.title}</p>
          <div
            className="
                        hidden
                        md:flex
                        text-sm
                        text-neutral-500
                        md:flex-wrap
                        md:justify-end
                    "
          >
            {list.category.map((category, idx) => (
              <span key={category}>
                {category}
                {idx < list.category.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div>${list.price}</div>
          <div>{list.address}</div>
        </div>
        <div className="flex gap-2">
          <HeartCount
            count={list.favorites}
            usedItemId={list.id}
            currentUser={currentUser}
          />
          <CommentCount usedItemId={list.id} comments={list.comments} />
        </div>
      </div>
    </motion.div>
  );
};

export default ListItem;
