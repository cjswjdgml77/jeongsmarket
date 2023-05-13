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
  console.log("pathname", pathname);
  const [isLoading, setIsLoading] = useState(pathname !== "/");
  console.log(isLoading);
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
