import type { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md bg-[#00f2ff] px-4 py-2 text-sm font-semibold text-[#080a0c] transition hover:bg-[#00d1ff] focus:outline-none focus:ring-2 focus:ring-[#00f2ff] ${className}`}
    />
  );
}

