'use client';

import { Feature, FeatureCategory, ProjectType, ProjectTypeConfig } from '@/src/application/repositories/IFeatureRepository';
import { MockTemplateRepository } from '@/src/infrastructure/repositories/mock/MockTemplateRepository';
import { CrystalBubble } from '@/src/presentation/components/effects';
import { BuilderViewModel } from '@/src/presentation/presenters/builder';
import { useQuotationStore } from '@/src/presentation/stores';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ExportModal } from './ExportModal';

interface BuilderViewProps {
  initialViewModel: BuilderViewModel;
}

// Category labels in Thai
const CATEGORY_LABELS: Record<FeatureCategory, string> = {
  core: '🎯 ฟีเจอร์หลัก',
  'ui-ux': '🎨 UI/UX',
  backend: '⚙️ Backend',
  database: '🗄️ Database',
  auth: '🔐 Authentication',
  integration: '🔗 Integration',
  analytics: '📊 Analytics',
  security: '🛡️ Security',
  performance: '⚡ Performance',
  support: '🛠️ Support',
  addon: '✨ Add-ons',
};

/**
 * Project Type Selector Component
 */
function ProjectTypeSelector({ 
  projectTypes, 
  selected, 
  onSelect 
}: { 
  projectTypes: ProjectTypeConfig[];
  selected: ProjectType | null;
  onSelect: (type: ProjectType) => void;
}) {
  return (
    <div className="builder-project-types">
      <h2 className="builder-section-title">เลือกประเภทโปรเจค</h2>
      <div className="builder-project-grid">
        {projectTypes.map((pt) => (
          <button
            key={pt.id}
            onClick={() => onSelect(pt.id)}
            className={`builder-project-card ${selected === pt.id ? 'selected' : ''}`}
          >
            <span className="builder-project-icon">{pt.icon}</span>
            <span className="builder-project-name">{pt.nameTh}</span>
            <span className="builder-project-price">
              เริ่มต้น ฿{pt.basePrice.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Feature Card Component
 */
function FeatureCard({ 
  feature, 
  isSelected, 
  onToggle,
  disabled 
}: { 
  feature: Feature;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div 
      className={`builder-feature-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onToggle}
    >
      <div className="builder-feature-header">
        <span className="builder-feature-icon">{feature.icon}</span>
        <div className="builder-feature-checkbox">
          {isSelected && <span>✓</span>}
        </div>
      </div>
      <h4 className="builder-feature-name">{feature.name}</h4>
      <p className="builder-feature-description">{feature.description}</p>
      <div className="builder-feature-meta">
        <span className={`builder-feature-level level-${feature.level}`}>
          {feature.level}
        </span>
        <span className="builder-feature-price">
          ฿{feature.price.toLocaleString()}
        </span>
      </div>
      {feature.dependencies && feature.dependencies.length > 0 && (
        <div className="builder-feature-deps">
          🔗 ต้องการ: {feature.dependencies.length} ฟีเจอร์
        </div>
      )}
      {feature.isPopular && (
        <div className="builder-feature-popular">🔥 ยอดนิยม</div>
      )}
    </div>
  );
}

/**
 * Quotation Summary Component
 */
function QuotationSummary({ onExport }: { onExport: () => void }) {
  const { items, subtotal, discount, tax, total, discountPercent, setDiscountPercent, resetQuotation } = useQuotationStore();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_VISIBLE_ITEMS = 5;
  const hasMoreItems = items.length > MAX_VISIBLE_ITEMS;
  const visibleItems = isExpanded ? items : items.slice(0, MAX_VISIBLE_ITEMS);
  const hiddenCount = items.length - MAX_VISIBLE_ITEMS;

  return (
    <div className="builder-summary">
      <h3 className="builder-summary-title">
        📋 สรุปใบเสนอราคา
        {items.length > 0 && (
          <span className="builder-summary-count">({items.length} รายการ)</span>
        )}
      </h3>
      
      <div className="builder-summary-items">
        {items.length === 0 ? (
          <p className="builder-summary-empty">ยังไม่ได้เลือกฟีเจอร์</p>
        ) : (
          <>
            {visibleItems.map((item) => (
              <div key={item.featureId} className="builder-summary-item">
                <span className="builder-summary-item-name">
                  {item.feature.icon} {item.feature.name}
                </span>
                <span className="builder-summary-item-price">
                  ฿{item.subtotal.toLocaleString()}
                </span>
              </div>
            ))}
            {hasMoreItems && (
              <button 
                className="builder-summary-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded 
                  ? '▲ แสดงน้อยลง' 
                  : `▼ ดูอีก ${hiddenCount} รายการ`
                }
              </button>
            )}
          </>
        )}
      </div>

      <div className="builder-summary-divider" />

      <div className="builder-summary-row">
        <span>ราคารวม</span>
        <span>฿{subtotal.toLocaleString()}</span>
      </div>

      <div className="builder-summary-discount">
        <label>ส่วนลด (%)</label>
        <input
          type="number"
          min="0"
          max="50"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(Number(e.target.value))}
          className="builder-discount-input"
        />
      </div>

      {discount > 0 && (
        <div className="builder-summary-row discount">
          <span>ส่วนลด</span>
          <span>-฿{discount.toLocaleString()}</span>
        </div>
      )}

      <div className="builder-summary-row">
        <span>VAT 7%</span>
        <span>฿{tax.toLocaleString()}</span>
      </div>

      <div className="builder-summary-divider" />

      <div className="builder-summary-row total">
        <span>ยอดรวมสุทธิ</span>
        <span>฿{total.toLocaleString()}</span>
      </div>

      <div className="builder-summary-actions">
        <button 
          className="builder-reset-btn" 
          onClick={resetQuotation}
          disabled={items.length === 0}
        >
          🗑️ ล้าง
        </button>
        <button 
          className="builder-export-btn" 
          disabled={items.length === 0}
          onClick={onExport}
        >
          📄 ส่งออก
        </button>
      </div>
    </div>
  );
}

/**
 * Dependency Warning Modal
 */
function DependencyWarningModal() {
  const { 
    showDependencyWarning, 
    pendingFeature, 
    missingDependencies,
    addFeatureWithDependencies,
    dismissDependencyWarning 
  } = useQuotationStore();

  if (!showDependencyWarning || !pendingFeature) return null;

  return (
    <div className="main-modal-overlay">
      <div className="main-modal">
        <div className="main-modal-header">
          <h3 className="main-modal-title">🔗 ต้องการฟีเจอร์เพิ่มเติม</h3>
          <button className="main-modal-close" onClick={dismissDependencyWarning}>
            ✕
          </button>
        </div>
        <div className="main-modal-body">
          <p className="mb-4">
            ฟีเจอร์ <strong>{pendingFeature.name}</strong> ต้องการฟีเจอร์ต่อไปนี้:
          </p>
          <ul className="builder-deps-list">
            {missingDependencies.map((dep) => (
              <li key={dep.id}>
                {dep.icon} {dep.name} - ฿{dep.price.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-modal-footer">
          <button 
            className="main-btn main-btn-secondary"
            onClick={dismissDependencyWarning}
          >
            ยกเลิก
          </button>
          <button 
            className="main-btn main-btn-primary"
            onClick={() => addFeatureWithDependencies(pendingFeature, missingDependencies)}
          >
            เพิ่มทั้งหมด (+฿{missingDependencies.reduce((sum, d) => sum + d.price, 0).toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * BuilderView Component
 * Main view for quotation builder page
 */
export function BuilderView({ initialViewModel }: BuilderViewProps) {
  const { projectTypes, features } = initialViewModel;
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | 'all'>('all');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [templateLoaded, setTemplateLoaded] = useState(false);
  const searchParams = useSearchParams();
  
  const { 
    projectType, 
    setProjectType,
    setProjectName,
    selectedFeatureIds,
    toggleFeature,
    addFeature,
    resetQuotation,
  } = useQuotationStore();

  // Load template from URL parameter
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && !templateLoaded) {
      const loadTemplate = async () => {
        const templateRepo = new MockTemplateRepository();
        const template = await templateRepo.getWithFeatures(templateId);
        
        if (template) {
          // Reset and set project type
          resetQuotation();
          setProjectType(template.projectType);
          setProjectName(template.nameTh);
          
          // Add all template features
          template.features.forEach((feature) => {
            addFeature(feature);
          });
          
          setTemplateLoaded(true);
        }
      };
      loadTemplate();
    }
  }, [searchParams, templateLoaded, resetQuotation, setProjectType, setProjectName, addFeature]);

  // Filter features by project type and category
  const filteredFeatures = useMemo(() => {
    let result = features;
    
    if (projectType) {
      result = result.filter((f) => f.recommendedFor.includes(projectType));
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter((f) => f.category === selectedCategory);
    }
    
    return result;
  }, [features, projectType, selectedCategory]);

  // Get unique categories from filtered features
  const availableCategories = useMemo(() => {
    const categories = new Set(
      (projectType 
        ? features.filter((f) => f.recommendedFor.includes(projectType))
        : features
      ).map((f) => f.category)
    );
    return Array.from(categories) as FeatureCategory[];
  }, [features, projectType]);

  // Group features by category
  const groupedFeatures = useMemo(() => {
    const groups: Record<FeatureCategory, Feature[]> = {} as Record<FeatureCategory, Feature[]>;
    
    filteredFeatures.forEach((f) => {
      if (!groups[f.category]) {
        groups[f.category] = [];
      }
      groups[f.category].push(f);
    });
    
    return groups;
  }, [filteredFeatures]);

  return (
    <div className="builder-page">
      <CrystalBubble count={10} className="opacity-30" />
      
      <div className="builder-container">
        {/* Left Panel - Feature Selection */}
        <div className="builder-main">
          <div className="builder-header">
            <h1 className="builder-title">
              🛠️ สร้างใบเสนอราคา
            </h1>
            <p className="builder-subtitle">
              เลือกฟีเจอร์ที่ต้องการ ระบบจะคำนวณราคาให้อัตโนมัติ
            </p>
          </div>

          {/* Project Type Selection */}
          <ProjectTypeSelector 
            projectTypes={projectTypes}
            selected={projectType}
            onSelect={setProjectType}
          />

          {/* Category Filter */}
          {projectType && (
            <div className="builder-category-filter">
              <button
                className={`builder-category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                ทั้งหมด
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  className={`builder-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          )}

          {/* Features Grid */}
          {projectType && (
            <div className="builder-features">
              {selectedCategory === 'all' ? (
                // Show grouped by category
                Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                  <div key={category} className="builder-category-group">
                    <h3 className="builder-category-title">
                      {CATEGORY_LABELS[category as FeatureCategory]}
                    </h3>
                    <div className="builder-features-grid">
                      {categoryFeatures.map((feature) => (
                        <FeatureCard
                          key={feature.id}
                          feature={feature}
                          isSelected={selectedFeatureIds.includes(feature.id)}
                          onToggle={() => toggleFeature(feature, features)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Show flat grid for selected category
                <div className="builder-features-grid">
                  {filteredFeatures.map((feature) => (
                    <FeatureCard
                      key={feature.id}
                      feature={feature}
                      isSelected={selectedFeatureIds.includes(feature.id)}
                      onToggle={() => toggleFeature(feature, features)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {!projectType && (
            <div className="builder-placeholder">
              <span className="builder-placeholder-icon">👆</span>
              <p>กรุณาเลือกประเภทโปรเจคด้านบนเพื่อเริ่มต้น</p>
            </div>
          )}
        </div>

        {/* Right Panel - Summary */}
        <QuotationSummary onExport={() => setIsExportModalOpen(true)} />
      </div>

      {/* Dependency Warning Modal */}
      <DependencyWarningModal />
      
      {/* Export Modal */}
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
      />
    </div>
  );
}
