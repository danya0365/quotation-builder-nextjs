/**
 * MockLandingRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
    ILandingRepository,
    LandingData,
} from '@/src/application/repositories/ILandingRepository';

// Mock data for landing page
const MOCK_LANDING_DATA: LandingData = {
  hero: {
    badge: '✨ เปิดให้บริการแล้ว',
    title: 'สร้างใบเสนอราคา',
    titleHighlight: 'อย่างมืออาชีพ',
    subtitle: 'ระบบสร้างใบเสนอราคาแบบ Feature-based สำหรับทุกประเภทโปรเจค ไม่ว่าจะเป็น Web App, Mobile App หรือระบบภายในองค์กร คำนวณราคาแบบ Real-time พร้อมส่งออกเป็น PDF',
    primaryButtonText: 'เริ่มสร้างใบเสนอราคา →',
    secondaryButtonText: 'ดูตัวอย่าง',
  },
  features: [
    {
      id: 'feature-1',
      icon: '🎯',
      title: 'เลือกฟีเจอร์ได้ง่าย',
      description: 'เลือกฟีเจอร์ที่ต้องการจากรายการที่จัดหมวดหมู่อย่างชัดเจน พร้อมคำอธิบายราคาแต่ละรายการ',
    },
    {
      id: 'feature-2',
      icon: '💰',
      title: 'คำนวณราคา Real-time',
      description: 'ระบบคำนวณราคารวมอัตโนมัติทันทีที่เลือกฟีเจอร์ พร้อมแสดงส่วนลดและโปรโมชัน',
    },
    {
      id: 'feature-3',
      icon: '📄',
      title: 'ส่งออก PDF สวยงาม',
      description: 'Export ใบเสนอราคาเป็น PDF พร้อมใช้งาน มีดีไซน์ระดับมืออาชีพ ส่งให้ลูกค้าได้ทันที',
    },
    {
      id: 'feature-4',
      icon: '🔗',
      title: 'ระบบ Dependency',
      description: 'ป้องกันการเลือกฟีเจอร์ที่ต้องมีฟีเจอร์อื่นก่อน ช่วยให้ใบเสนอราคาถูกต้องสมบูรณ์',
    },
    {
      id: 'feature-5',
      icon: '📱',
      title: 'รองรับทุกประเภทโปรเจค',
      description: 'ใช้ได้กับ Web App, Mobile App, SaaS และระบบภายในองค์กร พร้อมเทมเพลตหลากหลาย',
    },
    {
      id: 'feature-6',
      icon: '☁️',
      title: 'บันทึกบนคลาวด์',
      description: 'บันทึกและจัดการใบเสนอราคาทั้งหมดบนคลาวด์ เข้าถึงได้ทุกที่ทุกเวลา',
    },
  ],
  stats: [
    { id: 'stat-1', value: '500+', label: 'ใบเสนอราคาที่สร้าง' },
    { id: 'stat-2', value: '50+', label: 'ฟีเจอร์ให้เลือก' },
    { id: 'stat-3', value: '10+', label: 'เทมเพลตโปรเจค' },
    { id: 'stat-4', value: '98%', label: 'ความพึงพอใจ' },
  ],
  cta: {
    title: 'พร้อมสร้างใบเสนอราคาแรกของคุณหรือยัง?',
    subtitle: 'เริ่มต้นใช้งานฟรีวันนี้ ไม่ต้องสมัครสมาชิก',
    buttonText: 'เริ่มใช้งานเลย',
  },
};

export class MockLandingRepository implements ILandingRepository {
  async getLandingData(): Promise<LandingData> {
    // Simulate network delay
    await this.delay(100);
    return MOCK_LANDING_DATA;
  }

  // Helper method to simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance for convenience
export const mockLandingRepository = new MockLandingRepository();
