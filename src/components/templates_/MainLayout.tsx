import type { ReactNode } from 'react';
import { Typography } from '../atoms/Typography';

export interface MainLayoutProps {
  /**
   * Child components to render within the layout
   */
  children: ReactNode;
}

/**
 * MainLayout template: provides a sidebar and header around the page content
 *
 * - Sidebar on the left with navigation
 * - Header at the top of the main content area
 * - Responsive and uses Tailwind CSS v4
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <Typography variant="h3">Gestión de Documentos </Typography>

        </header>

        {/* Page content */}
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;
