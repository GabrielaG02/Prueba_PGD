import  { forwardRef, type ChangeEventHandler, type FC } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  /** Texto opcional encima del grupo */
  label?: string;
  /** Aplica estilos de error (anillo rojo) */
  error?: boolean;
  /** Opciones del grupo */
  options: { value: string; label: string }[];
  /** Valor seleccionado */
  value: string;
  /** Manejador de cambio */
  onChange: ChangeEventHandler<HTMLInputElement>;
}

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
        <span id={name ? `${name}-label` : undefined} className="mb-1 font-medium text-gray-700">
          {label}
        </span>
      )}
      <div role="radiogroup" aria-labelledby={label && name ? `${name}-label` : undefined} className="flex gap-6">
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
