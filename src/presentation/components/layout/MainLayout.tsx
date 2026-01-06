'use client';

import { MainFooter } from './MainFooter';
import { MainHeader } from './MainHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout Component
 * Full-screen layout with fixed header/footer and scrollable content area
 * Designed for web-app feel (no body scroll)
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <MainHeader />
      <main className="main-content scrollbar-thin">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
