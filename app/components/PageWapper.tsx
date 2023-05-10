"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AnimatePage from "./AnimatePage";

type Props = {
  children: React.ReactNode;
};

const PageWapper = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        console.log("delete");
      }}
    >
      {/* {children} */}
      <AnimatePage>{children}</AnimatePage>
      {/* <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ ease: "easeIn", delay: 0.3 }}
        className="mt-14"
        key={(Math.random() * 5).toString()}
      >
        {children}
      </motion.div> */}
    </AnimatePresence>
  );
};

export default PageWapper;
