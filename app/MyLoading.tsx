"use client";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const MyLoading = ({ children }: Props) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(pathname !== "/");
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <>{children}</>
      ) : (
        <motion.div key="loader">
          <LoadingPage setIsLoading={setIsLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyLoading;
