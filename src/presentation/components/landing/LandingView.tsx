'use client';

import { CrystalBubble } from '@/src/presentation/components/effects';
import { LandingViewModel } from '@/src/presentation/presenters/landing';
import Link from 'next/link';

interface LandingViewProps {
  initialViewModel: LandingViewModel;
}

/**
 * LandingView Component
 * Main view for the landing page with hero, features, stats, and CTA sections
 */
export function LandingView({ initialViewModel }: LandingViewProps) {
  const { data } = initialViewModel;
  const { hero, features, stats, cta } = data;

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <CrystalBubble count={20} />
        
        <div className="landing-hero-content">
          <span className="landing-badge">
            {hero.badge}
          </span>
          
          <h1 className="landing-title">
            {hero.title}
            <br />
            <span className="main-hero-gradient">{hero.titleHighlight}</span>
          </h1>
          
          <p className="landing-subtitle">
            {hero.subtitle}
          </p>
          
          <div className="landing-actions">
            <Link href="/builder" className="landing-btn-primary">
              {hero.primaryButtonText}
            </Link>
            <Link href="/templates" className="landing-btn-secondary">
              {hero.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats">
        <div className="landing-stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="landing-stat">
              <div className="landing-stat-value">{stat.value}</div>
              <div className="landing-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-features-header">
          <h2 className="landing-features-title">
            ฟีเจอร์ที่จะทำให้คุณ
            <span className="main-hero-gradient"> ประทับใจ</span>
          </h2>
          <p className="landing-features-subtitle">
            ทุกสิ่งที่คุณต้องการในการสร้างใบเสนอราคาระดับมืออาชีพ
          </p>
        </div>

        <div className="landing-features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="landing-feature-card">
              <div className="landing-feature-icon">{feature.icon}</div>
              <h3 className="landing-feature-title">{feature.title}</h3>
              <p className="landing-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <h2 className="landing-cta-title">{cta.title}</h2>
        <p className="landing-cta-subtitle">{cta.subtitle}</p>
        <Link href="/builder" className="landing-cta-btn">
          {cta.buttonText}
        </Link>
      </section>
    </div>
  );
}
