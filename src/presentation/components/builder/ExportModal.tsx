'use client';

import { Quotation } from '@/src/application/repositories/IFeatureRepository';
import { useQuotationStore } from '@/src/presentation/stores';
import html2canvas from 'html2canvas';
import { useCallback, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { QuotationPreview } from './QuotationPreview';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ExportModal Component
 * Modal for exporting quotation to PDF or Image
 */
export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'settings'>('preview');
  const previewRef = useRef<HTMLDivElement>(null);
  
  const { 
    projectType,
    projectName, 
    setProjectName,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    items,
    notes,
    setNotes,
    exportQuotation 
  } = useQuotationStore();

  // Get quotation data
  const quotation: Quotation | null = projectType ? exportQuotation() : null;

  // Handle print/PDF
  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `Quotation-${quotation?.id || 'draft'}`,
    onAfterPrint: () => {
      setIsExporting(false);
    },
  });

  const onPrintClick = useCallback(() => {
    setIsExporting(true);
    handlePrint();
  }, [handlePrint]);

  // Handle image export
  const handleExportImage = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = `Quotation-${quotation?.id || 'draft'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle share link
  const handleShareLink = async () => {
    if (!quotation) return;
    
    // Encode quotation to base64
    const encodedData = btoa(encodeURIComponent(JSON.stringify({
      projectType: quotation.projectType,
      projectName: quotation.projectName,
      clientName: quotation.clientName,
      items: quotation.items.map(i => ({ 
        id: i.featureId, 
        name: i.feature.name,
        price: i.feature.price 
      })),
      discountPercent: quotation.discountPercent,
      notes: quotation.notes,
    })));
    
    const shareUrl = `${window.location.origin}/builder?q=${encodedData}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('คัดลอกลิงก์แชร์เรียบร้อยแล้ว!');
    } catch {
      // Fallback
      prompt('คัดลอกลิงก์นี้:', shareUrl);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="main-modal-overlay">
      <div className="export-modal">
        {/* Header */}
        <div className="export-modal-header">
          <h2 className="export-modal-title">📄 ส่งออกใบเสนอราคา</h2>
          <button className="main-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="export-tabs">
          <button 
            className={`export-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ ตั้งค่า
          </button>
          <button 
            className={`export-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            👁️ ตัวอย่าง
          </button>
        </div>

        {/* Content */}
        <div className="export-modal-content">
          {activeTab === 'settings' && (
            <div className="export-settings">
              <div className="export-form-group">
                <label>ชื่อโปรเจค</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="ระบุชื่อโปรเจค"
                  className="main-input"
                />
              </div>
              <div className="export-form-group">
                <label>ชื่อลูกค้า</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="ระบุชื่อลูกค้า"
                  className="main-input"
                />
              </div>
              <div className="export-form-group">
                <label>อีเมลลูกค้า</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="main-input"
                />
              </div>
              <div className="export-form-group">
                <label>หมายเหตุ</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                  className="main-input"
                  rows={3}
                />
              </div>
            </div>
          )}

          {activeTab === 'preview' && quotation && (
            <div className="export-preview-container">
              <QuotationPreview ref={previewRef} quotation={quotation} />
            </div>
          )}

          {activeTab === 'preview' && !quotation && (
            <div className="export-empty">
              <p>กรุณาเลือกฟีเจอร์อย่างน้อย 1 รายการ</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="export-modal-footer">
          <button 
            className="main-btn main-btn-secondary"
            onClick={handleShareLink}
            disabled={!quotation || items.length === 0}
          >
            🔗 แชร์ลิงก์
          </button>
          <button 
            className="main-btn main-btn-secondary"
            onClick={handleExportImage}
            disabled={isExporting || !quotation || items.length === 0}
          >
            🖼️ บันทึกรูป
          </button>
          <button 
            className="main-btn main-btn-primary"
            onClick={onPrintClick}
            disabled={isExporting || !quotation || items.length === 0}
          >
            {isExporting ? '⏳ กำลังส่งออก...' : '📄 พิมพ์ / PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
