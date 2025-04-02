import { tv } from 'tailwind-variants';
import { forwardRef, InputHTMLAttributes } from 'react';

const inputStyles = tv({
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={inputStyles({ error, disabled, className })}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';