import React from 'react';
import { Select } from '../atoms/Select';

export interface SubcategorySelectProps {
  /**
   * Currently selected subcategory or empty string for “all”
   */
  value: string;
  /**
   * List of subcategories corresponding to the selected category
   */
  options: string[];
  /**
   * Callback invoked when the subcategory changes
   */
  onChange: (value: string) => void;
  /**
   * Flag to apply error styles when invalid state
   */
  error?: boolean;
  /**
   * Disable the select input
   */
  disabled?: boolean;
}

/**
 * SubcategorySelect molecule: renders a labeled, accessible Select for subcategories
 */
export const SubcategorySelect: React.FC<SubcategorySelectProps> = ({
  value,
  options,
  onChange,
  error = false,
  disabled = false,
}) => (
  <Select
    label="Subcategoría"
    title="Subcategoría"       // <-- ensures the <select> has an accessible name
    id="subcategory-select"    // optionally provide a stable id for testing/label association
    value={value}
    onChange={(e) => onChange(e.target.value)}
    error={error}
    disabled={disabled}
    className='w-1/2 pl-5'
  >
    <option value="">Todas</option>
    {options.map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </Select>
);

SubcategorySelect.displayName = 'SubcategorySelect';

export default SubcategorySelect;