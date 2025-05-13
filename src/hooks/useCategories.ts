import { useMemo } from 'react';
import type { Category, SubcategoryMap } from '../types/category';

/**
 * Custom hook to provide document categories and their corresponding subcategories
 *
 * Categories and subcategories are defined statically based on the business requirements.
 */
export const useCategories = () => {
  /**
   * List of available categories
   */
  const categories = useMemo<Category[]>(
    () => ['Administrativo', 'Financiero', 'Legal'],
    []
  );

  /**
   * Mapping of category to its subcategories
   */
  const subcategories = useMemo<SubcategoryMap>(
    () => ({
      Administrativo: ['Acta', 'Circular', 'Memorando'],
      Financiero: ['Factura', 'Informe de gastos', 'Presupuesto'],
      Legal: ['Contrato', 'Resolución', 'Normatividad'],
    }),
    []
  );

  return { categories, subcategories };
};

export default useCategories;