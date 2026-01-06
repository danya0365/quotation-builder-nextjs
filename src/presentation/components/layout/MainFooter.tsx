'use client';

import Link from 'next/link';

/**
 * MainFooter Component
 * Minimal footer with branding and quick links
 */
export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer-container">
        {/* Brand */}
        <div className="main-footer-brand">
          <span className="main-footer-logo">📋 Quotation Builder</span>
          <span className="main-footer-copyright">
            © {currentYear} All rights reserved
          </span>
        </div>

        {/* Quick Links */}
        <nav className="main-footer-nav">
          <Link href="/about" className="main-footer-link">
            เกี่ยวกับเรา
          </Link>
          <Link href="/contact" className="main-footer-link">
            ติดต่อ
          </Link>
          <Link href="/privacy" className="main-footer-link">
            ความเป็นส่วนตัว
          </Link>
        </nav>
      </div>
    </footer>
  );
}
