"use client";

type Props = {
  description: string;
};

const TextArea = ({ description }: Props) => {
  const data = description
    .split("\n")
    .map((data) => <div key={data}>{data}</div>);
  return <div className="w-full max-h-[30vh] overflow-y-auto">{data}</div>;
};

export default TextArea;
