import { forwardRef } from 'react';
import { InputProps } from './@types';
import { inputStyles } from './variants';

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