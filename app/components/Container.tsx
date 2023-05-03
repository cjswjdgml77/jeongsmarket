type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="w-full mx-auto xl:px-15 md:px-10 sm:px-2 px-5">
      {children}
    </div>
  );
};

export default Container;
