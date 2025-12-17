import type { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400 transition"
    >
      {children}
    </button>
  );
}