"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import { useRouter } from "next/navigation";
import HeartCount from "../button/HeartCount";
import { CurrentUserFavorites, UsedItemWithImgComFav } from "@/app/type";
import CommentCount from "../button/CommentCount";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {
  data: UsedItemWithImgComFav;
  currentUser?: CurrentUserFavorites;
};

const UsedItemCard = ({ data, currentUser }: Props) => {
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
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
        {!isDone && (
          <Skeleton
            className="top-0 left-0 z-10 w-full h-full aspect-square"
            style={{ position: "absolute" }}
          />
        )}
        <Image
          className="group-hover:scale-110 transitio cursor-pointer w-full h-full aspect-square"
          alt={data.title}
          src={data.images[0].secure_url}
          width={400}
          height={400}
          onClick={() => {
            router.push(`/useditem/${data.id}`);
          }}
          onLoad={() => setIsDone(true)}
        />
      </div>

      <div className="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
        {data.title || <Skeleton />}
      </div>
      <div className="text-right justify-end text-neutral-400 text-sm w-full flex flex-wrap">
        {data.category ? (
          data.category.map((category, idx) => (
            <span key={category}>
              {category}
              {data.category.length > idx + 1 && ","}
            </span>
          ))
        ) : (
          <Skeleton width={"9rem"} />
        )}
      </div>
      <span className="px-2 rounded-md text-right">
        {`$${data.price}` || <Skeleton width={"6rem"} />}
      </span>

      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {data.address ? (
          <>
            <BiMap className="inline-block" /> {data.address}
          </>
        ) : (
          <Skeleton />
        )}
      </p>
      <div className="flex items-center gap-3">
        {data.favorites ? (
          <HeartCount
            count={data.favorites}
            usedItemId={data.id}
            currentUser={currentUser}
          />
        ) : (
          <Skeleton width={"2rem"} />
        )}
        {data.comments ? (
          <CommentCount usedItemId={data.id} comments={data.comments} />
        ) : (
          <Skeleton width={"2rem"} />
        )}
      </div>
    </div>
  );
};

export default UsedItemCard;
