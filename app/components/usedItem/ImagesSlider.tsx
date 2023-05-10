"use client";
import { UsedItemImage } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import useImageSlider from "@/app/hooks/useImageSlider";
type Props = {
  images: UsedItemImage[];
};

const ImagesSlider = ({ images }: Props) => {
  const {
    isInitial,
    nextClickHandler,
    prevClickHandler,
    current,
    aniForCurrent,
    aniForSibling,
    sibling,
  } = useImageSlider({ images });
  return (
    <div className="">
      <div className="w-full relative">
        <div
          className="
          aspect-video
          relative
          rounded-md
          overflow-hidden
      "
        >
          <div
            className={`w-full h-full
              `}
          >
            {images.map((image, idx) => (
              <Image
                key={image.filename}
                alt={image.filename}
                src={image.secure_url}
                className={`
                      ${isInitial && idx === 0 && "z-30"}
                      ${!isInitial && current === idx && aniForCurrent}
                      ${!isInitial && sibling === idx && aniForSibling}
                    `}
                fill
              />
            ))}
          </div>
        </div>
        <div
          className={`absolute top-0 flex items-center  h-full -left-4 z-30 ${
            images.length === 1 && "hidden"
          }`}
        >
          <button onClick={prevClickHandler}>
            <MdOutlineArrowBackIosNew size={30} />
          </button>
        </div>
        <div
          className={`absolute top-0 flex items-center  h-full -right-4 z-30 ${
            images.length === 1 && "hidden"
          }`}
        >
          <button onClick={nextClickHandler}>
            <MdOutlineArrowForwardIos size={30} />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        {images.map((item, idx) => (
          <GoPrimitiveDot
            key={item.filename}
            size={20}
            className={`
            transition 
            ${idx === current && "scale-125"}
            ${!current && idx === 0 && "scale-125"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagesSlider;
