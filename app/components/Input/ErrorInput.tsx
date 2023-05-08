import React from "react";

type Props = {
  error: string;
};

const ErrorInput = ({ error }: Props) => {
  return (
    <>
      <span className="p-3 text-red-400/80">{error}</span>
    </>
  );
};

export default ErrorInput;
