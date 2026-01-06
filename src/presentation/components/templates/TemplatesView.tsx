'use client';

import { Template, TemplateCategory } from '@/src/application/repositories/ITemplateRepository';
import { CATEGORY_LABELS } from '@/src/infrastructure/repositories/mock/MockTemplateRepository';
import { CrystalBubble } from '@/src/presentation/components/effects';
import { TemplatesViewModel } from '@/src/presentation/presenters/templates';
import { useQuotationStore } from '@/src/presentation/stores';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface TemplatesViewProps {
  initialViewModel: TemplatesViewModel;
}

// Project type labels
const PROJECT_TYPE_LABELS: Record<string, string> = {
  'web-app': 'Web App',
  'mobile-app': 'Mobile App',
  'internal-system': 'Internal System',
  'saas': 'SaaS',
};

/**
 * Template Card Component
 */
function TemplateCard({ 
  template, 
  onUse 
}: { 
  template: Template;
  onUse: () => void;
}) {
  return (
    <div className="template-card">
      {template.isFeatured && (
        <div className="template-featured-badge">⭐ แนะนำ</div>
      )}
      {template.isPopular && (
        <div className="template-popular-badge">🔥 ยอดนิยม</div>
      )}
      
      <div className="template-icon">{template.icon}</div>
      
      <h3 className="template-name">{template.nameTh}</h3>
      <p className="template-name-en">{template.name}</p>
      
      <p className="template-description">{template.description}</p>
      
      <div className="template-meta">
        <span className="template-type">
          {PROJECT_TYPE_LABELS[template.projectType]}
        </span>
        <span className="template-features">
          {template.featureIds.length} ฟีเจอร์
        </span>
      </div>
      
      <div className="template-tags">
        {template.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="template-tag">#{tag}</span>
        ))}
      </div>
      
      <div className="template-pricing">
        <div className="template-price">
          <span className="price-label">ประมาณการ</span>
          <span className="price-value">฿{template.estimatedPrice.toLocaleString()}</span>
        </div>
        <div className="template-days">
          <span className="days-label">ระยะเวลา</span>
          <span className="days-value">{template.estimatedDays} วัน</span>
        </div>
      </div>
      
      <button className="template-use-btn" onClick={onUse}>
        ใช้เทมเพลตนี้ →
      </button>
    </div>
  );
}

/**
 * Featured Templates Carousel
 */
function FeaturedTemplates({ 
  templates, 
  onUse 
}: { 
  templates: Template[];
  onUse: (template: Template) => void;
}) {
  if (templates.length === 0) return null;

  return (
    <div className="templates-featured">
      <h2 className="templates-section-title">⭐ เทมเพลตแนะนำ</h2>
      <div className="templates-featured-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-featured-card">
            <div className="template-featured-icon">{template.icon}</div>
            <div className="template-featured-info">
              <h3>{template.nameTh}</h3>
              <p>{template.description}</p>
              <div className="template-featured-price">
                ฿{template.estimatedPrice.toLocaleString()} • {template.estimatedDays} วัน
              </div>
            </div>
            <button 
              className="template-featured-btn"
              onClick={() => onUse(template)}
            >
              ใช้งาน
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * TemplatesView Component
 */
export function TemplatesView({ initialViewModel }: TemplatesViewProps) {
  const { templates, featuredTemplates, categories } = initialViewModel;
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const { 
    setProjectType,
    addFeature,
    resetQuotation,
  } = useQuotationStore();

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = templates;
    
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(query) ||
        t.nameTh.includes(searchQuery) ||
        t.description.includes(searchQuery) ||
        t.tags.some((tag) => tag.includes(query))
      );
    }
    
    return result;
  }, [templates, selectedCategory, searchQuery]);

  // Handle using a template
  const handleUseTemplate = async (template: Template) => {
    // Reset current quotation
    resetQuotation();
    
    // Set project type
    setProjectType(template.projectType);
    
    // Navigate to builder with template parameter
    router.push(`/builder?template=${template.id}`);
  };

  return (
    <div className="templates-page">
      <CrystalBubble count={8} className="opacity-20" />
      
      <div className="templates-container">
        {/* Header */}
        <div className="templates-header">
          <h1 className="templates-title">📋 เทมเพลตใบเสนอราคา</h1>
          <p className="templates-subtitle">
            เลือกเทมเพลตสำเร็จรูปที่เหมาะกับโปรเจคของคุณ แล้วปรับแต่งตามต้องการ
          </p>
        </div>

        {/* Search */}
        <div className="templates-search">
          <input
            type="text"
            placeholder="🔍 ค้นหาเทมเพลต..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="templates-search-input"
          />
        </div>

        {/* Featured Templates */}
        {!searchQuery && selectedCategory === 'all' && (
          <FeaturedTemplates 
            templates={featuredTemplates} 
            onUse={handleUseTemplate} 
          />
        )}

        {/* Category Filter */}
        <div className="templates-categories">
          <button
            className={`templates-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            ทั้งหมด
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`templates-category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={() => handleUseTemplate(template)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="templates-empty">
            <span className="templates-empty-icon">🔍</span>
            <p>ไม่พบเทมเพลตที่ตรงกับคำค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
}
