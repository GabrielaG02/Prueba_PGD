import {forwardRef,type FC,type ChangeEventHandler,type InputHTMLAttributes,} from 'react';
import clsx from 'clsx';

/**
 * Props for the RadioGroup component
 */
export interface RadioGroupProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'onChange'
  > {
  /**
   * Optional text displayed above the radio group
   */
  label?: string;
  /**
   * Applies error styling  when true
   */
  error?: boolean;
  /**
   * Array of options to render; each with a value and label
   */
  options: { value: string; label: string }[];
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Change event handler for the radio inputs
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Atomic RadioGroup component 
 *
 * - Renders an optional label above the group
 * - Maps `options` to a set of radios sharing the same `name`
 * - Applies `error` styles when invalid
 * - Forwards `ref` to the container `<div>`
 * - Accepts all native input props (except size, value, onChange)
 */
export const RadioGroup: FC<RadioGroupProps> = forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(
  (
    {
      label,
      name,
      value: selectedValue,
      onChange,
      error = false,
      disabled = false,
      className,
      options,
      ...rest
    },
    ref
  ) => (
    <div ref={ref} className={clsx('flex flex-col', className)}>
      {label && (
        <span
          id={name ? `${name}-label` : undefined}
          className="mb-1 font-medium text-gray-700"
        >
          {label}
        </span>
      )}

      <div
        role="radiogroup"
        aria-labelledby={label && name ? `${name}-label` : undefined}
        className="flex gap-6"
      >
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={onChange}
              disabled={disabled}
              className={clsx(
                'form-radio h-4 w-4 transition',
                error
                  ? 'text-red-500 focus:ring-2 focus:ring-red-500'
                  : 'text-indigo-600 focus:ring-2 focus:ring-indigo-500',
                disabled && 'cursor-not-allowed opacity-50'
              )}
              {...rest}
            />
            <span className="ml-2 text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
);

RadioGroup.displayName = 'RadioGroup';
