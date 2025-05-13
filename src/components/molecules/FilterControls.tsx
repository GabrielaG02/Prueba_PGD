import React from 'react';
import { Button } from '../atoms/Button';
import { Select } from '../atoms/Select';
import type { Category } from '../../types/category';
import type { SubcategoryMap } from '../../types/category';
import type { DocumentType } from '../../types/document';

export interface FilterControlsProps {
  /**
   * Selected category
   */
  category: Category | '';
  /**
   * Subcategory options mapping by category
   */
  subcategories: SubcategoryMap;
  /**
   * Selected subcategory
   */
  subcategory: string;
  /**
   * Selected document type ('PDF'|'Word'|'Imagen' or empty)
   */
  type: DocumentType | '';
  /**
   * Change handlers
   */
  onCategoryChange: (value: Category | '') => void;
  onSubcategoryChange: (value: string) => void;
  onTypeChange: (value: DocumentType | '') => void;
  /**
   * Apply and reset filter callbacks
   */
  onApply: () => void;
  onReset: () => void;
  /**
   * Disable controls when loading
   */
  disabled?: boolean;
}

/**
 * FilterControls molecule: renders filter selects and action buttons
 *
 * - Category and Subcategory selects are dependent
 * - Type select for document types
 * - Apply and Reset buttons
 */
export const FilterControls: React.FC<FilterControlsProps> = ({
  category,
  subcategories,
  subcategory,
  type,
  onCategoryChange,
  onSubcategoryChange,
  onTypeChange,
  onReset,
  disabled = false,
}) => {
  const typeOptions: (DocumentType | '')[] = ['', 'PDF', 'Word', 'Imagen'];
  const currentSubs = category ? subcategories[category] : [];

  return (
    <div className=" auto-cols-max items-start space-y-3 md:flex md:flex-wrap md:gap-4 md:items-end">
      <Select
        label="Categoría"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | '')}
        disabled={disabled}
      >
        <option value="">Todas</option>
        {(Object.keys(subcategories) as Category[]).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>

      <Select
        label="Subcategoría"
        value={subcategory}
        onChange={(e) => onSubcategoryChange(e.target.value)}
        disabled={disabled || !category}
        error={!category && Boolean(subcategory)}
      >
        <option value="">Todas</option>
        {currentSubs.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </Select>

      <Select
        label="Tipo"
        value={type}
        onChange={(e) => onTypeChange(e.target.value as DocumentType | '')}
        disabled={disabled}
      >
        {typeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt === '' ? 'Todos' : opt}
          </option>
        ))}
      </Select>

      <div className="flex gap-2">

        <Button variant="secondary" size="md" onClick={onReset} disabled={disabled}>
          Resetear
        </Button>
      </div>
    </div>
  );
};

FilterControls.displayName = 'FilterControls';
export default FilterControls;