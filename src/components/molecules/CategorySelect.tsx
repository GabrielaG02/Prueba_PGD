import { type FC, type ChangeEvent } from 'react';
import { Select } from '../atoms/Select';
import type { Category } from '../../types/category';

export interface CategorySelectProps {
  /**
   * Currently selected category or empty string for “all”
   */
  value: Category | '';
  /**
   * Callback invoked when the category changes
   */
  onChange: (value: Category | '') => void;
  /**
   * Flag to apply error styles
   */
  error?: boolean;
  /**
   * Disable the select input
   */
  disabled?: boolean;
}

/**
 * CategorySelect molecule: renders a labeled, accessible Select for categories
 *
 * Categories: 'Administrativo', 'Financiero', 'Legal'
 */
export const CategorySelect: FC<CategorySelectProps> = ({
  value,
  onChange,
  error = false,
  disabled = false,
}) => {
  const categories: Category[] = ['Administrativo', 'Financiero', 'Legal'];
  const id = 'category-select';

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Category | '');
  };

  return (
    <Select
      id={id}                    // ensure <select> has an id
      title="Categoría"          // accessible name for Axe
      label="Categoría"          // visible label
      value={value}
      onChange={handleChange}
      error={error}
      disabled={disabled}
      className='w-1/2 pr-5'
    >
      <option value="">Todas</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </Select>
  );
};

CategorySelect.displayName = 'CategorySelect';

export default CategorySelect;