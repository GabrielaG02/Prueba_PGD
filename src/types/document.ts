import type { Category } from './category';

/**
 * Allowed document file types
 */
export type DocumentType = 'PDF' | 'Word' | 'Imagen';

/**
 * Document state (active or inactive)
 */
export type DocumentState = 'Activo' | 'Inactivo';

/**
 * Document entity as stored and displayed in the application
 */
export interface Document {
  /** Unique identifier */
  id: string;
  /** Document name */
  nombre: string;
  /** Document description */
  descripcion: string;
  /** File type of the document */
  tipo: DocumentType;
  /** ISO timestamp of when the document was uploaded */
  fechaSubida: string;
  /** Current state of the document */
  estado: DocumentState;
  /** Document category */
  categoria: Category;
  /** Document subcategory, dependent on category */
  subcategoria: string;
}