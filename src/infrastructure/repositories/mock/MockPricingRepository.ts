/**
 * MockPricingRepository
 * Mock implementation with pricing plans and FAQs
 */

import {
    AddOnService,
    FAQItem,
    IPricingRepository,
    PlanTier,
    PricingPlan,
} from '@/src/application/repositories/IPricingRepository';

const MOCK_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    tier: 'starter',
    name: 'Starter',
    nameTh: 'สำหรับเริ่มต้น',
    description: 'เหมาะสำหรับธุรกิจขนาดเล็กหรือ Startup ที่ต้องการเว็บไซต์หรือระบบพื้นฐาน',
    price: 49000,
    originalPrice: 65000,
    priceNote: 'เริ่มต้น',
    billingPeriod: 'project',
    color: 'emerald',
    icon: '🌱',
    ctaText: 'เริ่มต้นใช้งาน',
    ctaLink: '/builder',
    features: [
      { name: 'ออกแบบหน้าเว็บ 3-5 หน้า', included: true },
      { name: 'Responsive Design', included: true },
      { name: 'ระบบจัดการเนื้อหาพื้นฐาน', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Hosting 1 ปี', included: true, limit: '5GB' },
      { name: 'Support ผ่าน Email', included: true, limit: '30 วัน' },
      { name: 'ระบบสมาชิก', included: false },
      { name: 'ระบบชำระเงิน', included: false },
      { name: 'Custom Features', included: false },
      { name: 'Source Code', included: false },
    ],
  },
  {
    id: 'professional',
    tier: 'professional',
    name: 'Professional',
    nameTh: 'มืออาชีพ',
    description: 'เหมาะสำหรับธุรกิจที่ต้องการระบบครบวงจร พร้อมฟีเจอร์ขั้นสูง',
    price: 149000,
    originalPrice: 199000,
    priceNote: 'ยอดนิยม',
    billingPeriod: 'project',
    color: 'indigo',
    icon: '⚡',
    isPopular: true,
    ctaText: 'เลือกแพ็คเกจนี้',
    ctaLink: '/builder',
    features: [
      { name: 'ออกแบบหน้าเว็บไม่จำกัด', included: true },
      { name: 'Responsive Design', included: true },
      { name: 'ระบบจัดการเนื้อหาขั้นสูง', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Hosting 1 ปี', included: true, limit: '20GB' },
      { name: 'Support ผ่าน Email + LINE', included: true, limit: '90 วัน' },
      { name: 'ระบบสมาชิก', included: true },
      { name: 'ระบบชำระเงิน', included: true },
      { name: 'Custom Features', included: true, limit: '5 รายการ' },
      { name: 'Source Code', included: false },
    ],
  },
  {
    id: 'enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    nameTh: 'องค์กร',
    description: 'เหมาะสำหรับองค์กรขนาดใหญ่ที่ต้องการระบบเฉพาะทาง พร้อม Support 24/7',
    price: 0,
    priceNote: 'ติดต่อเรา',
    billingPeriod: 'project',
    color: 'amber',
    icon: '🏢',
    isFeatured: true,
    ctaText: 'ติดต่อทีมขาย',
    ctaLink: '/contact',
    features: [
      { name: 'ออกแบบตามความต้องการ', included: true },
      { name: 'Responsive Design', included: true },
      { name: 'ระบบ CMS เต็มรูปแบบ', included: true },
      { name: 'SSL Certificate', included: true },
      { name: 'Hosting ไม่จำกัด', included: true },
      { name: 'Support 24/7', included: true },
      { name: 'ระบบสมาชิกขั้นสูง', included: true },
      { name: 'ระบบชำระเงินครบวงจร', included: true },
      { name: 'Custom Features ไม่จำกัด', included: true },
      { name: 'Source Code + สิทธิ์ทั้งหมด', included: true },
    ],
  },
];

const MOCK_FAQS: FAQItem[] = [
  {
    question: 'ใช้เวลาพัฒนานานเท่าไหร่?',
    answer: 'ขึ้นอยู่กับความซับซ้อนของโปรเจค โดยเฉลี่ยแล้ว Starter ใช้เวลา 2-3 สัปดาห์, Professional 4-8 สัปดาห์ และ Enterprise 2-4 เดือน',
  },
  {
    question: 'สามารถปรับแต่งฟีเจอร์เพิ่มเติมได้หรือไม่?',
    answer: 'ได้แน่นอน! คุณสามารถเลือกฟีเจอร์ที่ต้องการได้ในหน้า Builder หรือติดต่อทีมของเราเพื่อปรึกษาฟีเจอร์พิเศษ',
  },
  {
    question: 'รับประกันงานหรือไม่?',
    answer: 'เรารับประกันงานทุกโปรเจค รวมถึงบริการแก้ไข Bug ฟรี 90 วันหลังส่งมอบงาน',
  },
  {
    question: 'ชำระเงินอย่างไร?',
    answer: 'ชำระมัดจำ 50% ก่อนเริ่มงาน และชำระส่วนที่เหลือเมื่อส่งมอบงาน สามารถชำระผ่านโอนธนาคาร, บัตรเครดิต หรือ PromptPay',
  },
  {
    question: 'รองรับการดูแลระยะยาวหรือไม่?',
    answer: 'เรามีบริการ Maintenance Package รายเดือนและรายปี สำหรับการดูแล อัพเดท และ Support ต่อเนื่อง',
  },
  {
    question: 'สามารถขอดู Portfolio ได้หรือไม่?',
    answer: 'ได้แน่นอน! ติดต่อทีมของเราเพื่อรับตัวอย่างงานที่เคยทำและ Case Study',
  },
];

const MOCK_ADDONS: AddOnService[] = [
  {
    id: 'maintenance',
    name: 'Maintenance Package',
    description: 'ดูแลระบบ อัพเดท Security และแก้ไขปัญหารายเดือน',
    price: 5000,
    priceUnit: 'เดือน',
    icon: '🔧',
  },
  {
    id: 'seo',
    name: 'SEO Optimization',
    description: 'ปรับแต่ง SEO ให้ติดอันดับ Google',
    price: 15000,
    priceUnit: 'ครั้ง',
    icon: '🎯',
  },
  {
    id: 'training',
    name: 'Training Session',
    description: 'สอนการใช้งานระบบ 2-4 ชั่วโมง',
    price: 3000,
    priceUnit: 'ครั้ง',
    icon: '📚',
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    description: 'ออกแบบ UI/UX แบบ Custom',
    price: 25000,
    priceUnit: 'โปรเจค',
    icon: '🎨',
  },
  {
    id: 'api',
    name: 'API Development',
    description: 'พัฒนา API เพิ่มเติม',
    price: 15000,
    priceUnit: 'endpoint',
    icon: '🔌',
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'พัฒนา Mobile App iOS/Android',
    price: 80000,
    priceUnit: 'แอป',
    icon: '📱',
  },
];

export class MockPricingRepository implements IPricingRepository {
  async getPlans(): Promise<PricingPlan[]> {
    await this.delay(100);
    return [...MOCK_PLANS];
  }

  async getPlanByTier(tier: PlanTier): Promise<PricingPlan | null> {
    await this.delay(50);
    return MOCK_PLANS.find((p) => p.tier === tier) || null;
  }

  async getFAQs(): Promise<FAQItem[]> {
    await this.delay(100);
    return [...MOCK_FAQS];
  }

  async getAddOns(): Promise<AddOnService[]> {
    await this.delay(100);
    return [...MOCK_ADDONS];
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockPricingRepository = new MockPricingRepository();
