import { UsedItemImage } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";

type Props = {
  images: UsedItemImage[];
};
export default function useImageSlider({ images }: Props) {
  const [selected, setSelected] = useState({ imgIdx: 0, isNext: false });
  const [isInitial, setIsInitial] = useState(true);

  const nextClickHandler = useCallback(() => {
    setIsInitial(false);
    setSelected((prev) => {
      return {
        imgIdx: prev.imgIdx === images.length - 1 ? 0 : prev.imgIdx + 1,
        isNext: true,
      };
    });
  }, []);
  const prevClickHandler = useCallback(() => {
    setIsInitial(false);
    setSelected((prev) => {
      return {
        imgIdx: prev.imgIdx === 0 ? images.length - 1 : prev.imgIdx - 1,
        isNext: false,
      };
    });
  }, []);

  const { current, sibling, aniForCurrent, aniForSibling } = useMemo(() => {
    if (isInitial)
      return {
        current: null,
        sibling: null,
        aniForCurrent: null,
        aniForSibling: null,
      };
    let imgSibling;
    let aniForCurrent;
    let aniForSibling;
    if (selected.isNext) {
      if (selected.imgIdx === 0) {
        imgSibling = images.length - 1;
      } else {
        imgSibling = selected.imgIdx - 1;
      }
      aniForCurrent = "image-slider__next z-[2]";
      aniForSibling = "image-slider__next-sibling z-[1]";
    } else {
      if (selected.imgIdx === images.length - 1) {
        imgSibling = 0;
      } else {
        imgSibling = selected.imgIdx + 1;
      }
      aniForCurrent = "image_slider__prev z-[2]";
      aniForSibling = "image_slider__prev-sibling z-[1]";
    }
    return {
      current: selected.imgIdx,
      sibling: imgSibling,
      aniForCurrent,
      aniForSibling,
    };
  }, [selected, images, isInitial]);

  return {
    nextClickHandler,
    prevClickHandler,
    current,
    sibling,
    aniForCurrent,
    aniForSibling,
    isInitial,
  };
}
