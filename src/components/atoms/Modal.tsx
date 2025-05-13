import { type FC, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

export interface ModalProps {
  /**
   * Controls whether the modal is visible
   */
  isOpen: boolean;
  /**
   * Callback invoked when the user clicks the overlay
   * or outside the modal content
   */
  onClose: () => void;
  /**
   * Content to render inside the modal “card”
   */
  children: ReactNode;
  /**
   * Additional classes to customize the content container
   */
  className?: string;
}

/**
 * Atomic Modal component 
 *
 * - Renders nothing when `isOpen` is false
 * - Creates a fixed full-screen overlay and centers the content card
 * - Clicking the overlay (outside the card) invokes `onClose`
 * - Stops propagation of clicks inside the card
 * - Applies `role="dialog"` and `aria-modal="true"` for accessibility
 */
export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent clicks inside the content card from closing the modal
    e.stopPropagation();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Centered white content card */}
      <div
        className={clsx(
          'relative bg-white rounded-lg shadow-xl p-6 max-w-lg w-full',
          className
        )}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.displayName = 'Modal';
