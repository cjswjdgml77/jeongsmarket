"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { category } from "../Input/CategoryContainer";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const Categories = ({}: Props) => {
  // const [selected, setSelected] = useState<string>("");
  const categories = category;
  const selected = useSearchParams()?.get("category");
  const router = useRouter();
  const clickHandler = useCallback(
    (label: string) => {
      if (selected === label) {
        router.replace(`/`);
      } else {
        router.replace(`?category=${label}`);
      }
    },
    [router, selected]
  );
  const selectedOne = useMemo(() => {
    return selected;
  }, [selected]);

  return (
    <div className="flex py-5 flex-col gap-5 w-full h-auto items-center sticky top-0 bg-white z-10">
      <div className="w-full text-center text-xl">Category</div>
      <div className="flex w-full xl:justify-center gap-10 overflow-x-auto overflow-y-hidden pb-4">
        {categories &&
          categories.length > 0 &&
          categories.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={`
                         relative
                         flex
                         flex-col
                         items-center
                         justify-center
                         cursor-pointer
                         transition
                         ${
                           selectedOne === label
                             ? "text-neutral-800 scale-110"
                             : "text-neutral-400"
                         }
                      `}
              onClick={() => {
                clickHandler(label);
              }}
            >
              <Icon size={30} />
              <div>{label}</div>
              {/* {selectedOne === label ? (
                <motion.div
                  className="bg-black w-full h-[1px]"
                  layoutId="underline"
                ></motion.div>
              ) : null} */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
