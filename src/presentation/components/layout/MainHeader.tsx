'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

// Navigation links configuration
const NAV_LINKS = [
  { href: '/', label: 'หน้าแรก', icon: '🏠' },
  { href: '/builder', label: 'สร้างใบเสนอราคา', icon: '🛠️' },
  { href: '/templates', label: 'เทมเพลต', icon: '📑' },
  { href: '/pricing', label: 'ราคา', icon: '💰' },
];

/**
 * MainHeader Component
 * Glass-morphism header with navigation and theme toggle
 */
export function MainHeader() {
  const pathname = usePathname();

  // Check if link is active (exact match for home, startsWith for others)
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

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
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`main-nav-link ${isActive(link.href) ? 'main-nav-link-active' : ''}`}
            >
              <span className="main-nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
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
