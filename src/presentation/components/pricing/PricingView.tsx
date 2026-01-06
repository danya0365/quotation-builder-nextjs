'use client';

import { AddOnService, FAQItem, PricingPlan } from '@/src/application/repositories/IPricingRepository';
import { CrystalBubble } from '@/src/presentation/components/effects';
import { PricingViewModel } from '@/src/presentation/presenters/pricing';
import Link from 'next/link';
import { useState } from 'react';

interface PricingViewProps {
  initialViewModel: PricingViewModel;
}

/**
 * Pricing Card Component
 */
function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className={`pricing-card ${plan.isPopular ? 'popular' : ''} ${plan.isFeatured ? 'featured' : ''}`}>
      {plan.isPopular && (
        <div className="pricing-popular-badge">🔥 ยอดนิยม</div>
      )}
      
      <div className="pricing-card-header">
        <span className="pricing-icon">{plan.icon}</span>
        <h3 className="pricing-name">{plan.name}</h3>
        <p className="pricing-name-th">{plan.nameTh}</p>
      </div>

      <p className="pricing-description">{plan.description}</p>

      <div className="pricing-price-section">
        {plan.originalPrice && plan.originalPrice > plan.price && (
          <span className="pricing-original">
            ฿{plan.originalPrice.toLocaleString()}
          </span>
        )}
        {plan.price > 0 ? (
          <div className="pricing-price">
            <span className="pricing-currency">฿</span>
            <span className="pricing-amount">{plan.price.toLocaleString()}</span>
          </div>
        ) : (
          <div className="pricing-price custom">
            <span className="pricing-amount">{plan.priceNote}</span>
          </div>
        )}
        {plan.price > 0 && (
          <span className="pricing-period">ต่อโปรเจค</span>
        )}
      </div>

      <ul className="pricing-features">
        {plan.features.map((feature, index) => (
          <li key={index} className={feature.included ? 'included' : 'excluded'}>
            <span className="feature-icon">
              {feature.included ? '✓' : '✕'}
            </span>
            <span className="feature-name">{feature.name}</span>
            {feature.limit && (
              <span className="feature-limit">{feature.limit}</span>
            )}
          </li>
        ))}
      </ul>

      <Link href={plan.ctaLink} className="pricing-cta">
        {plan.ctaText}
      </Link>
    </div>
  );
}

/**
 * FAQ Accordion Component
 */
function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pricing-faq">
      <h2 className="pricing-section-title">❓ คำถามที่พบบ่อย</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="faq-toggle">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Add-on Services Section
 */
function AddOnSection({ addons }: { addons: AddOnService[] }) {
  return (
    <div className="pricing-addons">
      <h2 className="pricing-section-title">➕ บริการเสริม</h2>
      <div className="addons-grid">
        {addons.map((addon) => (
          <div key={addon.id} className="addon-card">
            <span className="addon-icon">{addon.icon}</span>
            <h4 className="addon-name">{addon.name}</h4>
            <p className="addon-description">{addon.description}</p>
            <div className="addon-price">
              <span className="addon-amount">฿{addon.price.toLocaleString()}</span>
              <span className="addon-unit">/{addon.priceUnit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PricingView Component
 */
export function PricingView({ initialViewModel }: PricingViewProps) {
  const { plans, faqs, addons } = initialViewModel;

  return (
    <div className="pricing-page">
      <CrystalBubble count={8} className="opacity-20" />
      
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <h1 className="pricing-title">💰 ราคาและแพ็คเกจ</h1>
          <p className="pricing-subtitle">
            เลือกแพ็คเกจที่เหมาะกับธุรกิจของคุณ หรือสร้างใบเสนอราคาแบบกำหนดเอง
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Custom Quote CTA */}
        <div className="pricing-custom-cta">
          <div className="custom-cta-content">
            <h3>🛠️ ต้องการระบบเฉพาะทาง?</h3>
            <p>สร้างใบเสนอราคาแบบกำหนดเอง เลือกฟีเจอร์ที่ต้องการได้ตามใจ</p>
          </div>
          <Link href="/builder" className="custom-cta-btn">
            สร้างใบเสนอราคา →
          </Link>
        </div>

        {/* Add-on Services */}
        <AddOnSection addons={addons} />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* Contact CTA */}
        <div className="pricing-contact">
          <h3>📞 มีคำถามเพิ่มเติม?</h3>
          <p>ทีมของเราพร้อมให้คำปรึกษาฟรี ติดต่อได้ตลอด 24 ชั่วโมง</p>
          <div className="contact-buttons">
            <a href="tel:+66812345678" className="contact-btn phone">
              📱 โทร 081-234-5678
            </a>
            <a href="https://line.me/ti/p/" className="contact-btn line">
              💚 LINE: @quotation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
