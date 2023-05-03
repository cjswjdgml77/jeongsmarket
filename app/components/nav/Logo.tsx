/* eslint-disable react/no-unescaped-entities */
import { TiShoppingCart } from "react-icons/ti";
type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex">
      <TiShoppingCart size={26} />
      <div>Jeong's market</div>
    </div>
  );
};

export default Logo;
