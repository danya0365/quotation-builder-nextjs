/**
 * MockTemplateRepository
 * Mock implementation with pre-defined quotation templates
 * Including Queue Management System template
 */

import { Feature, ProjectType } from '@/src/application/repositories/IFeatureRepository';
import {
    ITemplateRepository,
    Template,
    TemplateCategory,
    TemplateWithFeatures,
} from '@/src/application/repositories/ITemplateRepository';
import { MockFeatureRepository } from './MockFeatureRepository';

// Template definitions
const MOCK_TEMPLATES: Template[] = [
  // ============ Queue Management System ============
  {
    id: 'queue-management-system',
    name: 'Queue Management System',
    nameTh: 'ระบบจัดการคิว',
    description: 'ระบบจัดการคิวครบวงจร สำหรับธนาคาร โรงพยาบาล หน่วยงานราชการ ร้านอาหาร พร้อมหน้าจอแสดงคิว แอปเรียกคิว และระบบวิเคราะห์ข้อมูล',
    category: 'hospitality',
    projectType: 'web-app',
    icon: '🎫',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'dark-mode',
      'email-password-auth',
      'role-based-access',
      'rest-api',
      'database-setup',
      'analytics-dashboard',
      'custom-reports',
      'ssl-certificate',
      'admin-panel',
      'push-notifications',
    ],
    estimatedPrice: 195000,
    estimatedDays: 45,
    isPopular: true,
    isFeatured: true,
    tags: ['queue', 'hospital', 'bank', 'restaurant', 'government', 'display', 'analytics'],
  },

  // ============ E-Commerce Platform ============
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    nameTh: 'แพลตฟอร์มอีคอมเมิร์ซ',
    description: 'ระบบร้านค้าออนไลน์ครบวงจร พร้อมตะกร้าสินค้า ชำระเงินออนไลน์ จัดการสต็อก และระบบขนส่ง',
    category: 'ecommerce',
    projectType: 'web-app',
    icon: '🛒',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'dark-mode',
      'email-password-auth',
      'social-login',
      'rest-api',
      'file-upload',
      'search-engine',
      'database-setup',
      'payment-gateway',
      'email-service',
      'line-integration',
      'analytics-dashboard',
      'ssl-certificate',
      'admin-panel',
      'seo-optimization',
    ],
    estimatedPrice: 285000,
    estimatedDays: 60,
    isPopular: true,
    isFeatured: true,
    tags: ['shop', 'cart', 'payment', 'inventory', 'shipping'],
  },

  // ============ Hospital Management System ============
  {
    id: 'hospital-management',
    name: 'Hospital Management System',
    nameTh: 'ระบบบริหารจัดการโรงพยาบาล',
    description: 'ระบบ HIS สำหรับโรงพยาบาลและคลินิก จัดการนัดหมาย เวชระเบียน ใบสั่งยา และการเงิน',
    category: 'healthcare',
    projectType: 'internal-system',
    icon: '🏥',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'email-password-auth',
      'two-factor-auth',
      'role-based-access',
      'rest-api',
      'file-upload',
      'search-engine',
      'database-setup',
      'backup-restore',
      'email-service',
      'sms-service',
      'analytics-dashboard',
      'custom-reports',
      'audit-log',
      'ssl-certificate',
      'data-encryption',
      'admin-panel',
    ],
    estimatedPrice: 450000,
    estimatedDays: 90,
    isPopular: true,
    tags: ['hospital', 'clinic', 'medical', 'patient', 'EMR', 'HIS'],
  },

  // ============ Learning Management System ============
  {
    id: 'lms-platform',
    name: 'Learning Management System',
    nameTh: 'ระบบจัดการเรียนรู้ออนไลน์',
    description: 'แพลตฟอร์มเรียนออนไลน์ พร้อมระบบคอร์ส วิดีโอเลคเชอร์ แบบทดสอบ และใบประกาศนียบัตร',
    category: 'education',
    projectType: 'saas',
    icon: '📚',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'dark-mode',
      'multi-language',
      'email-password-auth',
      'social-login',
      'rest-api',
      'file-upload',
      'database-setup',
      'payment-gateway',
      'email-service',
      'analytics-dashboard',
      'ssl-certificate',
      'caching-system',
      'admin-panel',
      'help-center',
      'multi-tenant',
      'subscription-billing',
    ],
    estimatedPrice: 380000,
    estimatedDays: 75,
    isFeatured: true,
    tags: ['education', 'course', 'video', 'quiz', 'certificate'],
  },

  // ============ Restaurant POS System ============
  {
    id: 'restaurant-pos',
    name: 'Restaurant POS System',
    nameTh: 'ระบบ POS ร้านอาหาร',
    description: 'ระบบจุดขายสำหรับร้านอาหาร พร้อมจัดการเมนู โต๊ะ ออเดอร์ ครัว และรายงานยอดขาย',
    category: 'hospitality',
    projectType: 'web-app',
    icon: '🍽️',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'email-password-auth',
      'role-based-access',
      'rest-api',
      'file-upload',
      'database-setup',
      'payment-gateway',
      'analytics-dashboard',
      'custom-reports',
      'ssl-certificate',
      'admin-panel',
      'push-notifications',
    ],
    estimatedPrice: 180000,
    estimatedDays: 40,
    isPopular: true,
    tags: ['restaurant', 'pos', 'order', 'kitchen', 'menu'],
  },

  // ============ HR Management System ============
  {
    id: 'hr-management',
    name: 'HR Management System',
    nameTh: 'ระบบบริหารทรัพยากรบุคคล',
    description: 'ระบบ HR ครบวงจร จัดการพนักงาน ลางาน เงินเดือน ประเมินผล และฝึกอบรม',
    category: 'enterprise',
    projectType: 'internal-system',
    icon: '👥',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'email-password-auth',
      'two-factor-auth',
      'role-based-access',
      'rest-api',
      'file-upload',
      'database-setup',
      'backup-restore',
      'email-service',
      'analytics-dashboard',
      'custom-reports',
      'audit-log',
      'ssl-certificate',
      'admin-panel',
      'ldap-integration',
    ],
    estimatedPrice: 320000,
    estimatedDays: 65,
    tags: ['hr', 'employee', 'payroll', 'leave', 'performance'],
  },

  // ============ Booking System ============
  {
    id: 'booking-system',
    name: 'Booking & Reservation System',
    nameTh: 'ระบบจองและนัดหมาย',
    description: 'ระบบจองนัดหมายสำหรับสปา คลินิกเสริมความงาม ฟิตเนส หรือบริการต่างๆ',
    category: 'hospitality',
    projectType: 'web-app',
    icon: '📅',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'dark-mode',
      'email-password-auth',
      'social-login',
      'rest-api',
      'database-setup',
      'payment-gateway',
      'email-service',
      'sms-service',
      'line-integration',
      'analytics-dashboard',
      'ssl-certificate',
      'admin-panel',
    ],
    estimatedPrice: 165000,
    estimatedDays: 35,
    isPopular: true,
    tags: ['booking', 'appointment', 'spa', 'clinic', 'fitness'],
  },

  // ============ Startup MVP ============
  {
    id: 'startup-mvp',
    name: 'Startup MVP',
    nameTh: 'MVP สำหรับ Startup',
    description: 'โปรเจค MVP เริ่มต้นสำหรับ Startup พร้อมฟีเจอร์พื้นฐานที่จำเป็น พัฒนาได้เร็ว',
    category: 'startup',
    projectType: 'web-app',
    icon: '🚀',
    featureIds: [
      'user-management',
      'dashboard',
      'responsive-design',
      'email-password-auth',
      'social-login',
      'rest-api',
      'database-setup',
      'email-service',
      'ssl-certificate',
      'analytics-dashboard',
    ],
    estimatedPrice: 95000,
    estimatedDays: 20,
    isFeatured: true,
    tags: ['startup', 'mvp', 'fast', 'lean'],
  },

  // ============ Inventory Management ============
  {
    id: 'inventory-management',
    name: 'Inventory Management System',
    nameTh: 'ระบบจัดการสต็อกสินค้า',
    description: 'ระบบคลังสินค้าและสต็อก พร้อมบาร์โค้ด รายงานเตือนสต็อก และประวัติเคลื่อนไหว',
    category: 'business',
    projectType: 'internal-system',
    icon: '📦',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'email-password-auth',
      'role-based-access',
      'rest-api',
      'file-upload',
      'database-setup',
      'backup-restore',
      'analytics-dashboard',
      'custom-reports',
      'ssl-certificate',
      'admin-panel',
    ],
    estimatedPrice: 145000,
    estimatedDays: 30,
    tags: ['inventory', 'stock', 'warehouse', 'barcode'],
  },

  // ============ CRM System ============
  {
    id: 'crm-system',
    name: 'CRM System',
    nameTh: 'ระบบบริหารลูกค้าสัมพันธ์',
    description: 'ระบบ CRM จัดการลูกค้า ติดตามยอดขาย Pipeline และ Lead Management',
    category: 'business',
    projectType: 'saas',
    icon: '💼',
    featureIds: [
      'user-management',
      'dashboard',
      'notification-system',
      'responsive-design',
      'email-password-auth',
      'role-based-access',
      'rest-api',
      'file-upload',
      'search-engine',
      'database-setup',
      'email-service',
      'line-integration',
      'analytics-dashboard',
      'custom-reports',
      'ssl-certificate',
      'admin-panel',
      'multi-tenant',
    ],
    estimatedPrice: 280000,
    estimatedDays: 55,
    isPopular: true,
    tags: ['crm', 'sales', 'lead', 'customer', 'pipeline'],
  },
];

// Category labels
export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  business: '💼 ธุรกิจ',
  ecommerce: '🛒 อีคอมเมิร์ซ',
  healthcare: '🏥 สุขภาพ',
  education: '📚 การศึกษา',
  hospitality: '🏨 บริการ',
  enterprise: '🏢 องค์กร',
  startup: '🚀 Startup',
};

export class MockTemplateRepository implements ITemplateRepository {
  private templates: Template[] = [...MOCK_TEMPLATES];
  private featureRepo = new MockFeatureRepository();

  async getAll(): Promise<Template[]> {
    await this.delay(100);
    return [...this.templates];
  }

  async getById(id: string): Promise<Template | null> {
    await this.delay(50);
    return this.templates.find((t) => t.id === id) || null;
  }

  async getByCategory(category: TemplateCategory): Promise<Template[]> {
    await this.delay(100);
    return this.templates.filter((t) => t.category === category);
  }

  async getByProjectType(projectType: ProjectType): Promise<Template[]> {
    await this.delay(100);
    return this.templates.filter((t) => t.projectType === projectType);
  }

  async getFeatured(): Promise<Template[]> {
    await this.delay(100);
    return this.templates.filter((t) => t.isFeatured);
  }

  async getWithFeatures(id: string): Promise<TemplateWithFeatures | null> {
    await this.delay(100);
    
    const template = this.templates.find((t) => t.id === id);
    if (!template) return null;

    const allFeatures = await this.featureRepo.getAll();
    const templateFeatures = template.featureIds
      .map((fId) => allFeatures.find((f) => f.id === fId))
      .filter((f): f is Feature => f !== undefined);

    return {
      ...template,
      features: templateFeatures,
    };
  }

  async search(query: string): Promise<Template[]> {
    await this.delay(100);
    const lowerQuery = query.toLowerCase();
    
    return this.templates.filter((t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.nameTh.includes(query) ||
      t.description.includes(query) ||
      t.tags.some((tag) => tag.includes(lowerQuery))
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const mockTemplateRepository = new MockTemplateRepository();
