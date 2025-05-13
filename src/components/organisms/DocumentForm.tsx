import React, { useState } from "react";
import type { FormEvent } from "react";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { RadioGroup } from '../atoms/RadioGroup';
import { Button } from "../atoms/Button";
import { Typography } from "../atoms/Typography";
import CategorySelect from "../molecules/CategorySelect";
import SubcategorySelect from "../molecules/SubcategorySelect";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/category";
import type {
  DocumentType,
  DocumentState,
  Document,
} from "../../types/document";

/**
 * Values for the DocumentForm
 */
export interface DocumentFormValues {
  id?: string; // optional for new documents
  nombre: string;
  descripcion: string;
  categoria: Category | "";
  subcategoria: string;
  tipo: DocumentType | "";
  estado: DocumentState;
}

/**
 * Props for DocumentForm component
 */
export interface DocumentFormProps {
  /**
   * Initial data when editing, leave undefined for new document
   */
  initialData?: Document;
  /**
   * Callback invoked with form values on submit
   */
  onSubmit: (values: DocumentFormValues) => void;
  /**
   * Callback invoked when user cancels form
   */
  onCancel: () => void;
}

/**
 * DocumentForm organism: renders a form for creating or editing a document
 *
 * - Uses Input and Select atoms, and Category/Subcategory molecules
 * - Handles internal state and validation
 */
export const DocumentForm: React.FC<DocumentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { subcategories } = useCategories();

  const [nombre, setNombre] = useState(initialData?.nombre || "");
  const [descripcion, setDescripcion] = useState(
    initialData?.descripcion || ""
  );
  const [categoria, setCategoria] = useState<Category | "">(
    initialData?.categoria || ""
  );
  const [subcategoria, setSubcategoria] = useState(
    initialData?.subcategoria || ""
  );
  const [tipo, setTipo] = useState<DocumentType | "">(initialData?.tipo || "");
const [estado, setEstado] = useState<DocumentState>(
  initialData?.estado ?? 'Activo'
);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      nombre,
      descripcion,
      categoria,
      subcategoria,
      tipo,
      estado,
    });
  };

  // Subcategory options based on selected category
  const currentSubs = categoria ? subcategories[categoria] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Typography variant="h2">
        {initialData ? "Editar Documento" : "Nuevo Documento"}
      </Typography>

      <Input
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <Select
        label="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value as DocumentType | "")}
        required
      >
        <option value="">Seleccione tipo</option>
        <option value="PDF">PDF</option>
        <option value="Word">Word</option>
        <option value="Imagen">Imagen</option>
      </Select>

      <div className="flex justify-between">
        <CategorySelect
          value={categoria}
          onChange={(val) => {
            setCategoria(val);
            setSubcategoria("");
          }}
        />

        <SubcategorySelect
          value={subcategoria}
          options={currentSubs}
          onChange={setSubcategoria}
          disabled={!categoria}
          error={!categoria && Boolean(subcategoria)}
        />
      </div>

      <Input
        label="Descripción"
        multiline
        rows={4}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <RadioGroup
        label="Estado"
        name="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value as DocumentState)}
        error={false}
        disabled={false}
        options={[
          { value: 'Activo', label: 'Activo' },
          { value: 'Inactivo', label: 'Inactivo' },
        ]}
      />

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
};

DocumentForm.displayName = "DocumentForm";
