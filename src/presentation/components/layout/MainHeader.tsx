'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

/**
 * MainHeader Component
 * Glass-morphism header with navigation and theme toggle
 */
export function MainHeader() {
  return (
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/" className="main-logo">
          <span className="main-logo-icon">📋</span>
          <span className="main-logo-text">Quotation Builder</span>
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          <Link href="/" className="main-nav-link main-nav-link-active">
            <span className="main-nav-icon">🏠</span>
            <span>หน้าแรก</span>
          </Link>
          <Link href="/builder" className="main-nav-link">
            <span className="main-nav-icon">🛠️</span>
            <span>สร้างใบเสนอราคา</span>
          </Link>
          <Link href="/templates" className="main-nav-link">
            <span className="main-nav-icon">📑</span>
            <span>เทมเพลต</span>
          </Link>
          <Link href="/pricing" className="main-nav-link">
            <span className="main-nav-icon">💰</span>
            <span>ราคา</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="main-header-actions">
          <ThemeToggle />
          <Link href="/builder" className="main-button-primary hidden sm:inline-flex">
            เริ่มต้นใช้งาน
          </Link>
        </div>
      </div>
    </header>
  );
}
