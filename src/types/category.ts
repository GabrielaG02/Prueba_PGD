/**
 * Category of a document as defined in business requirements
 */
export type Category = 'Administrativo' | 'Financiero' | 'Legal';

/**
 * Mapping of each Category to its corresponding list of Subcategories
 */
export type SubcategoryMap = Record<Category, string[]>;
