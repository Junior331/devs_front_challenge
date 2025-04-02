import { tv } from "tailwind-variants";

export const inputStyles = tv({
  base: 'block w-full rounded-md border-[#A1A1AA] focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
  variants: {
    error: {
      true: 'border-red-500 focus:border-red-500 focus:ring-red-500',
    },
    disabled: {
      true: 'bg-gray-100 cursor-not-allowed',
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});
