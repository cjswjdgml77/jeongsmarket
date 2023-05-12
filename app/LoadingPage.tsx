"use client";
type Props = {
  setIsLoading: (value: boolean) => void;
};
import Image from "next/image";
import bg from "../public/stuffbg.jpg";
import { motion } from "framer-motion";
const Images = ({
  url,
  idx,
  variants,
}: {
  url: string;
  idx: number;
  variants: {};
}) => {
  return (
    <motion.div
      variants={variants}
      className={`absolute
        ${idx === 0 && "top-[10vh] left-[10vw]"}
        ${idx === 1 && "top-[13vh] right-[8vw] "}
        ${idx === 2 && "bottom-[10vh] left-[8vw]"}
        ${idx === 3 && "bottom-[11vh] right-[9vw]"}
        `}
    >
      <div className="relative w-[15vh] h-[20vw]  sm:w-[20vw] sm:h-[20vh]">
        <Image
          src={url}
          alt="sub-background"
          width={200}
          height={150}
          className="w-full h-full"
        />
      </div>
    </motion.div>
  );
};
const LoadingPage = ({ setIsLoading }: Props) => {
  const imgUrls = [
    "https://res.cloudinary.com/dieondzh2/image/upload/v1683009619/samples/ecommerce/car-interior-design.jpg",
    "https://res.cloudinary.com/dieondzh2/image/upload/v1683009620/samples/ecommerce/accessories-bag.jpg",
    "https://res.cloudinary.com/dieondzh2/image/upload/v1683009634/cld-sample-5.jpg",
    "https://res.cloudinary.com/dieondzh2/image/upload/v1683009620/samples/ecommerce/leather-bag-gray.jpg",
  ];
  const container = {
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.35,
      },
    },
  };
  const variants = {
    initial: {
      y: 200,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  const mainVariants = {
    initial: {
      opacity: 0,
      y: 200,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      className="flex w-full h-screen items-center justify-center overflow-hidden relative"
      variants={container}
      initial="initial"
      animate="show"
      exit="exit"
      onAnimationComplete={() => {
        setIsLoading(true);
      }}
    >
      <motion.div
        className="relative w-3/4 sm:w-1/3"
        variants={mainVariants}
        layoutId="main-bg"
      >
        <Image
          src={bg}
          alt="main_backgroudn"
          width={400}
          height={300}
          className="w-full"
        />
      </motion.div>
      <div className="">
        {imgUrls.map((url, idx) => (
          <Images url={url} key={url} idx={idx} variants={variants} />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingPage;
