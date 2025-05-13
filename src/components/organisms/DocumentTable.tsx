import React, { useState } from "react";
import type { Document } from "../../types/document";
import { Button } from "../atoms/Button";

export interface DocumentTableProps {
  /**
   * Array of documents to display
   */
  documents: Document[];
  /**
   * Callback when the user clicks “Edit” on a row
   */
  onEdit: (doc: Document) => void;
  /**
   * Callback when the user clicks “Delete” on a row
   */
  onDelete: (id: string) => void;
}

/**
 * DocumentTable organism: renders a paginated table of documents
 */
const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  onEdit,
  onDelete,
}) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const pageCount = Math.ceil(documents.length / rowsPerPage);

  // Compute the slice of documents for the current page
  const paginated = documents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < pageCount - 1) setPage((prev) => prev + 1);
  };

  return (
     <div className="max-w-full  overflow-x-auto">
      <table className="min-w-full  bg-white shadow-sm rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Sub-Categoría</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((doc) => (
            <tr key={doc.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{doc.nombre}</td>
              <td className="px-4 py-2">{doc.tipo}</td>
              <td className="px-4 py-2">
                {new Date(doc.fechaSubida).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {doc.categoria}
              </td>
              <td className="px-4 py-2">
                {doc.subcategoria}
              </td>
              <td className="px-4 py-2">
                {doc.estado}
              </td>

              <td className="px-4 py-2 space-x-2">
                <Button variant="info" size="sm" onClick={() => onEdit(doc)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(doc.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrev}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page + 1} of {pageCount}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleNext}
          disabled={page >= pageCount - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

DocumentTable.displayName = "DocumentTable";
export default DocumentTable;
