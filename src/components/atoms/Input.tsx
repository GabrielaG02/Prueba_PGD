import { forwardRef } from 'react';
import type {InputHTMLAttributes,TextareaHTMLAttributes,ChangeEventHandler} from 'react';
import clsx from 'clsx';

interface BaseProps {
  /**
   * Optional label text displayed above the control
   */
  label?: string;
  /**
   * Flag to apply error styles 
   */
  error?: boolean;
  /**
   * Disables the control
   */
  disabled?: boolean;
  /**
   * Optional id (falls back to name)
   */
  id?: string;
  /**
   * Name attribute for form submission and ARIA
   */
  name?: string;
  /**
   * Extra class names on the wrapper
   */
  className?: string;
}

type InputOnlyProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: string | number;
  };

type TextareaOnlyProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    value?: string;
  };

export type InputProps = InputOnlyProps | TextareaOnlyProps;

/**
 * Atomic Input component 
 *
 * - label: optional, renders a label element above the input/textarea
 * - error: applies error styles 
 * - multiline: if true, renders a <textarea> instead of <input>
 * - inherits all native  input or textarea attributes, but never conflicts
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const {
    label,
    id,
    name,
    error = false,
    disabled = false,
    className,
    multiline,
    ...rest
  } = props;

  // same fallback logic
  const inputId = id ?? name;

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
        <label htmlFor={inputId} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={inputId}
          name={name}
          disabled={disabled}
          className={clsx(baseStyles, stateStyles, 'px-3 py-2')}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          name={name}
          disabled={disabled}
          className={clsx(baseStyles, stateStyles, 'px-3 py-2')}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
});

Input.displayName = 'Input';
