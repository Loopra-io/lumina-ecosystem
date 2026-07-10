import type { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-[#1f2937] bg-[#0f172a] px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#00f2ff] focus:outline-none focus:ring-2 focus:ring-[#00f2ff] ${className}`}
    />
  );
}

