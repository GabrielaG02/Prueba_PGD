import type { FC } from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import type { Document } from '../../types/document';
import { Edit2, Trash2 } from 'lucide-react';

export interface DocumentRowProps {
  /**
   * Document data to display in the row
   */
  document: Document;
  /**
   * Callback invoked when the Edit action is triggered
   */
  onEdit: (doc: Document) => void;
  /**
   * Callback invoked when the Delete action is triggered
   */
  onDelete: (id: string) => void;
}

/**
 * DocumentRow organism: renders a table row for a single document
 *
 * - Displays document properties: name, type, category, subcategory, upload date, status
 * - Provides Edit and Delete action buttons
 */
export const DocumentRow: FC<DocumentRowProps> = ({ document, onEdit, onDelete }) => {
  const {
    id,
    nombre,
    tipo,
    categoria,
    subcategoria,
    fechaSubida,
    estado,
  } = document;

  // Format upload date as DD/MM/YYYY
  const formattedDate = new Date(fechaSubida).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <tr>
      <td className="px-4 py-2 whitespace-nowrap">
        <Typography variant="body">{nombre}</Typography>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <Typography variant="body">{tipo}</Typography>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <Typography variant="body">{categoria}</Typography>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <Typography variant="body">{subcategoria}</Typography>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <Typography variant="body">{formattedDate}</Typography>
      </td>
      <td className="px-4 py-2 whitespace-nowrap">
        <span
          className={
            estado === 'Activo'
              ? 'inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
              : 'inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600'
          }
        >
          {estado}
        </span>
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(document)}
          aria-label="Edit document"
        >
          <Edit2 size={16} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(id)}
          aria-label="Delete document"
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  );
};

DocumentRow.displayName = 'DocumentRow';
export default DocumentRow;