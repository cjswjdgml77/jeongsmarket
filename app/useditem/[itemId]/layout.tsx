import PageWapper from "@/app/components/PageWapper";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;
