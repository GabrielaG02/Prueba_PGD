import React, { forwardRef } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'info' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Controls the color scheme and emphasis of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Controls the padding and font size of the button
   * @default 'md'
   */
  size?: ButtonSize;
}

/**
 * Atomic Button component using Tailwind CSS v4
 *
 * - variant: primary, secondary, info, or danger
 * - size: sm, md, or lg
 * - forwards ref to the underlying <button>
 * - accepts all native button props without conflict
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const baseClasses =
      'rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition';
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-primary text-white hover:bg-hover focus:bg-focus focus:border-primary focus:border-2 focus:text-primary',
      secondary: 'bg-gray-200 text-primary hover:bg-gray-300 focus:ring-gray-400',
      info: 'bg-green-500 text-white hover:bg-green-300 focus:ring-green-500',
      danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-700',
    };
    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
