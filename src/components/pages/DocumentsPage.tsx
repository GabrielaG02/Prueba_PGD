import React, { useState, useMemo } from "react";
import useDocuments from "../../hooks/useDocuments";
import { Modal } from "../atoms/Modal";
import FilterControls from "../molecules/FilterControls";
import DocumentTable from "../organisms/DocumentTable";
import { ConfirmDialog } from "../organisms/ConfirmDialog";
import { MainLayout } from "../templates_/MainLayout";
import {
  DocumentForm,
  type DocumentFormValues,
} from "../organisms/DocumentForm";
import type { Document, DocumentType } from "../../types/document";
import type { Category } from "../../types/category";

/**
 * Page component for managing documents.
 */
export const DocumentsPage: React.FC = () => {
  const {
    documents,
    subcategories,
    addDocument,
    updateDocument,
    deleteDocument,
  } = useDocuments();

  // UI state
  const [filterCategory, setFilterCategory] = useState<Category | "">("");
  const [filterSubcategory, setFilterSubcategory] = useState<string>("");
const [filterType, setFilterType] = useState<DocumentType | "">("");
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | undefined>(undefined);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string>("");

  // Derive filtered list
  const filteredDocs = useMemo(
    () =>
      documents.filter((doc) => {
        if (filterCategory && doc.categoria !== filterCategory) return false;
        if (filterSubcategory && doc.subcategoria !== filterSubcategory)
          return false;
        if (filterType && doc.tipo !== filterType) return false;
        return true;
      }),
    [documents, filterCategory, filterSubcategory, filterType]
  );

  const openNewForm = () => {
    setEditingDoc(undefined);
    setFormOpen(true);
  };

  const handleEdit = (doc: Document) => {
    setEditingDoc(doc);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setToDeleteId(id);
    setDeleteOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-[100vw] md:max-w-full ">
        <header className="flex  flex-col mb-4 space-y-2 justify-between items-start md:items-center md:flex-row">
          <h1 className="text-lg font-normal">
            Organiza,filtra y administra tus documentos en un solo lugar
          </h1>
          <button
            onClick={openNewForm}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-hover focus:bg-focus focus:border-primary focus:border-2 focus:text-primary "
          >
           Nuevo Documento 
          </button>
        </header>

        <FilterControls
          category={filterCategory}
          subcategories={subcategories}
          subcategory={filterSubcategory}
          type={filterType}
          onCategoryChange={setFilterCategory}
          onSubcategoryChange={setFilterSubcategory}
          onTypeChange={setFilterType}
          onApply={() => {
            /* aquí podrías trigger algún efecto si hace falta */
          }}
          onReset={() => {
            setFilterCategory("");
            setFilterSubcategory("");
            setFilterType("");
          }}
          disabled={false}
        />
        <DocumentTable
          documents={filteredDocs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isFormOpen && (
          <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
            <DocumentForm
              initialData={editingDoc}
              onSubmit={(values: DocumentFormValues) => {
                if (editingDoc) {
                  updateDocument(values);
                } else {
                  addDocument(values);
                }
                setFormOpen(false);
              }}
              onCancel={() => setFormOpen(false)}
            />
          </Modal>
        )}

        {isDeleteOpen && (
          <ConfirmDialog
            open={isDeleteOpen}
            title="Confirm Deletion"
            message="Are you sure you want to delete this document?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              deleteDocument(toDeleteId);
              setDeleteOpen(false);
            }}
            onCancel={() => setDeleteOpen(false)}
          />
        )}
      </div>
    </MainLayout>
  );
};

DocumentsPage.displayName = "DocumentsPage";
