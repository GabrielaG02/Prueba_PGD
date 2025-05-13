import { createPortal } from 'react-dom';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';

export interface ConfirmDialogProps {
  /**
   * Controls visibility of the dialog
   */
  open: boolean;
  /**
   * Title text displayed at the top of the dialog
   */
  title?: string;
  /**
   * Message or body content of the dialog
   */
  message?: string;
  /**
   * Text for the confirm action button
   */
  confirmText?: string;
  /**
   * Text for the cancel action button
   */
  cancelText?: string;
  /**
   * Callback when user confirms
   */
  onConfirm: () => void;
  /**
   * Callback when user cancels or closes
   */
  onCancel: () => void;
}

/**
 * ConfirmDialog organism: modal dialog with title, message, and action buttons
 *
 * - Uses portal to render at document.body
 * - Renders backdrop and centered dialog panel
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'Confirm',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75"
        onClick={onCancel}
      />

      {/* Dialog panel */}
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full mx-4 p-6 z-10">
        {title && (
          <Typography variant="h3" className="mb-2">
            {title}
          </Typography>
        )}
        {message && (
          <Typography variant="body" className="mb-6">
            {message}
          </Typography>
        )}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="md" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';
export default ConfirmDialog;