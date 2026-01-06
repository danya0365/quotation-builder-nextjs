'use client';

import { Quotation } from '@/src/application/repositories/IFeatureRepository';
import { forwardRef } from 'react';

interface QuotationPreviewProps {
  quotation: Quotation;
}

/**
 * QuotationPreview Component
 * Printable quotation document for PDF export
 */
export const QuotationPreview = forwardRef<HTMLDivElement, QuotationPreviewProps>(
  function QuotationPreview({ quotation }, ref) {
    const currentDate = new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const validUntilDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const projectTypeNames: Record<string, string> = {
      'web-app': 'เว็บแอปพลิเคชัน',
      'mobile-app': 'แอปพลิเคชันมือถือ',
      'internal-system': 'ระบบภายในองค์กร',
      'saas': 'แพลตฟอร์ม SaaS',
    };

    return (
      <div ref={ref} className="quotation-preview">
        {/* Header */}
        <div className="quotation-header">
          <div className="quotation-logo">
            <span className="quotation-logo-icon">📋</span>
            <span className="quotation-logo-text">Quotation Builder</span>
          </div>
          <div className="quotation-header-info">
            <div className="quotation-number">เลขที่: {quotation.id}</div>
            <div className="quotation-date">วันที่: {currentDate}</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="quotation-title">ใบเสนอราคา</h1>
        <p className="quotation-subtitle">QUOTATION</p>

        {/* Client Info */}
        <div className="quotation-client-section">
          <h3 className="quotation-section-title">ข้อมูลลูกค้า</h3>
          <div className="quotation-client-info">
            <div className="quotation-client-row">
              <span className="label">ชื่อลูกค้า:</span>
              <span className="value">{quotation.clientName || '-'}</span>
            </div>
            <div className="quotation-client-row">
              <span className="label">อีเมล:</span>
              <span className="value">{quotation.clientEmail || '-'}</span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="quotation-project-section">
          <h3 className="quotation-section-title">รายละเอียดโปรเจค</h3>
          <div className="quotation-project-info">
            <div className="quotation-project-row">
              <span className="label">ชื่อโปรเจค:</span>
              <span className="value">{quotation.projectName || 'ไม่ระบุ'}</span>
            </div>
            <div className="quotation-project-row">
              <span className="label">ประเภท:</span>
              <span className="value">{projectTypeNames[quotation.projectType] || quotation.projectType}</span>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="quotation-items-section">
          <h3 className="quotation-section-title">รายการฟีเจอร์</h3>
          <table className="quotation-table">
            <thead>
              <tr>
                <th className="col-no">#</th>
                <th className="col-name">รายการ</th>
                <th className="col-price">ราคา (บาท)</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item, index) => (
                <tr key={item.featureId}>
                  <td className="col-no">{index + 1}</td>
                  <td className="col-name">
                    <div className="item-name">{item.feature.icon} {item.feature.name}</div>
                    <div className="item-desc">{item.feature.description}</div>
                  </td>
                  <td className="col-price">{item.subtotal.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="quotation-summary-section">
          <div className="quotation-summary-row">
            <span>ราคารวม</span>
            <span>฿{quotation.subtotal.toLocaleString()}</span>
          </div>
          {quotation.discount > 0 && (
            <div className="quotation-summary-row discount">
              <span>ส่วนลด {quotation.discountPercent > 0 ? `(${quotation.discountPercent}%)` : ''}</span>
              <span>-฿{quotation.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="quotation-summary-row">
            <span>VAT {quotation.taxPercent}%</span>
            <span>฿{quotation.tax.toLocaleString()}</span>
          </div>
          <div className="quotation-summary-row total">
            <span>ยอดรวมสุทธิ</span>
            <span>฿{quotation.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Notes */}
        {quotation.notes && (
          <div className="quotation-notes-section">
            <h3 className="quotation-section-title">หมายเหตุ</h3>
            <p className="quotation-notes">{quotation.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="quotation-footer">
          <div className="quotation-validity">
            ใบเสนอราคานี้มีผลถึงวันที่ {validUntilDate}
          </div>
          <div className="quotation-terms">
            <h4>เงื่อนไขการชำระเงิน</h4>
            <ul>
              <li>ชำระมัดจำ 50% ก่อนเริ่มงาน</li>
              <li>ชำระส่วนที่เหลือเมื่อส่งมอบงาน</li>
              <li>ราคายังไม่รวมค่าบริการเพิ่มเติมนอกเหนือจากที่ระบุ</li>
            </ul>
          </div>
          <div className="quotation-signature">
            <div className="signature-box">
              <div className="signature-line"></div>
              <span>ลงชื่อ ผู้เสนอราคา</span>
            </div>
            <div className="signature-box">
              <div className="signature-line"></div>
              <span>ลงชื่อ ผู้อนุมัติ</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
