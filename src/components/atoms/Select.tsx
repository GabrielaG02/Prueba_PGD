import { forwardRef } from 'react';
import type { SelectHTMLAttributes} from 'react';
import clsx from 'clsx';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Optional label text displayed above the select
   */
  label?: string;
  /**
   * Flag to apply error styles 
   */
  error?: boolean;
}

/**
 * Atomic Select component 
 *
 * - label: optional, renders a label element above the select
 * - error: applies error styles 
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      id,
      error = false,
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    // If no id is provided, fall back to the select's name attribute for accessibility
    const selectId = id || rest.name;

    const baseStyles = 'block w-full rounded-md shadow-sm sm:text-sm transition';
    const stateStyles = clsx(
      'border',
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
      disabled && 'bg-gray-100 cursor-not-allowed'
    );

    return (
      <div className={clsx('flex flex-col', className)}>
        {label && (
          <label htmlFor={selectId as string} className="mb-1 font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId as string}
          disabled={disabled}
          className={clsx(baseStyles, stateStyles, 'px-3 py-2 appearance-none')}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
