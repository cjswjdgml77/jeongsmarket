"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AnimatePage = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ ease: "easeIn", delay: 0.3 }}
      className="mt-14"
      key={pathname}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
