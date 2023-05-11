"use client";

import { useCallback, useRef } from "react";

type Props = {
  label: string;
  onClick?: () => void;
};

const MenuItem = ({ label, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const rippleEffect = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const parent = ref.current;
      const div = document.createElement("div");
      const pos = parent.getBoundingClientRect();
      div.style.top = `${e.clientY - pos.top}px`;
      div.style.left = `${e.clientX - pos.left}px`;

      div.classList.add("ripple-effect");
      ref.current.appendChild(div);
      setTimeout(() => {
        div.remove();
        if (onClick) onClick();
      }, 400);
    },
    [onClick]
  );
  return (
    <div
      className="
        min-w-[10rem]
        w-full
        text-center
        cursor-pointer
        hover:bg-neutral-100
        relative
        overflow-hidden
        p-3"
      onClick={rippleEffect}
      ref={ref}
    >
      {label}
    </div>
  );
};

export default MenuItem;
