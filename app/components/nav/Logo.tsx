/* eslint-disable react/no-unescaped-entities */
import { TiShoppingCart } from "react-icons/ti";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex group cursor-pointer" onClick={() => router.push("/")}>
      <motion.div>
        <TiShoppingCart
          size={26}
          className="group-hover:animate-[movingCart_0.5s_cubic-bezier(0.68,-0.55,0.3,1.55)]"
        />
      </motion.div>
      <div className="overflow-hidden">
        <div className="group-hover:animate-[movingLetter_0.8s_cubic-bezier(0.68,-0.55,0.3,1.55)]">
          Jeong's market
        </div>
      </div>
    </div>
  );
};

export default Logo;
