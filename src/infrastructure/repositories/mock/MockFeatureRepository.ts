/**
 * MockFeatureRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - this is in the Infrastructure layer
 */

import {
  Feature,
  FeatureCategory,
  FeatureStats,
  IFeatureRepository,
  ProjectType,
  ProjectTypeConfig,
} from '@/src/application/repositories/IFeatureRepository';

// Project Type Configurations
const PROJECT_TYPES: ProjectTypeConfig[] = [
  {
    id: 'web-app',
    name: 'Web Application',
    nameTh: 'เว็บแอปพลิเคชัน',
    description: 'เว็บไซต์และแอปพลิเคชันที่ใช้ผ่าน Browser',
    icon: '🌐',
    basePrice: 50000,
    color: 'indigo',
    recommendedFeatures: ['responsive-design', 'seo-optimization', 'analytics-dashboard'],
  },
  {
    id: 'mobile-app',
    name: 'Mobile Application',
    nameTh: 'แอปมือถือ',
    description: 'แอปพลิเคชันสำหรับ iOS และ Android',
    icon: '📱',
    basePrice: 80000,
    color: 'purple',
    recommendedFeatures: ['push-notifications', 'offline-mode', 'biometric-auth'],
  },
  {
    id: 'internal-system',
    name: 'Internal System',
    nameTh: 'ระบบภายในองค์กร',
    description: 'ระบบจัดการภายในสำหรับใช้งานในองค์กร',
    icon: '🏢',
    basePrice: 100000,
    color: 'blue',
    recommendedFeatures: ['role-based-access', 'audit-log', 'ldap-integration'],
  },
  {
    id: 'saas',
    name: 'SaaS Platform',
    nameTh: 'แพลตฟอร์ม SaaS',
    description: 'ระบบ Software as a Service แบบ Multi-tenant',
    icon: '☁️',
    basePrice: 150000,
    color: 'cyan',
    recommendedFeatures: ['multi-tenant', 'subscription-billing', 'api-gateway'],
  },
];

// Mock Features Data
const MOCK_FEATURES: Feature[] = [
  // ============ CORE Features ============
  {
    id: 'user-management',
    name: 'ระบบจัดการผู้ใช้',
    description: 'ระบบ CRUD ผู้ใช้งาน จัดการโปรไฟล์ และสิทธิ์การเข้าถึงพื้นฐาน',
    price: 15000,
    category: 'core',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 3,
    icon: '👤',
    isPopular: true,
  },
  {
    id: 'dashboard',
    name: 'หน้า Dashboard',
    description: 'หน้าสรุปภาพรวมพร้อม Widget และ Chart แบบ Interactive',
    price: 20000,
    category: 'core',
    level: 'standard',
    recommendedFor: ['web-app', 'internal-system', 'saas'],
    estimatedDays: 4,
    icon: '📊',
    isPopular: true,
  },
  {
    id: 'notification-system',
    name: 'ระบบแจ้งเตือน',
    description: 'แจ้งเตือนผ่าน In-app, Email และ Push Notification',
    price: 18000,
    category: 'core',
    level: 'standard',
    dependencies: ['user-management'],
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 3,
    icon: '🔔',
  },
  
  // ============ UI/UX Features ============
  {
    id: 'responsive-design',
    name: 'Responsive Design',
    description: 'ออกแบบให้แสดงผลสวยงามทุกขนาดหน้าจอ Desktop, Tablet, Mobile',
    price: 10000,
    category: 'ui-ux',
    level: 'basic',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 2,
    icon: '📐',
    isPopular: true,
  },
  {
    id: 'dark-mode',
    name: 'โหมดมืด (Dark Mode)',
    description: 'รองรับการสลับธีมสว่าง/มืด ปรับแต่งได้ตามความชอบผู้ใช้',
    price: 8000,
    category: 'ui-ux',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 1,
    icon: '🌙',
  },
  {
    id: 'multi-language',
    name: 'รองรับหลายภาษา (i18n)',
    description: 'ระบบแปลภาษาอัตโนมัติ รองรับไทย, อังกฤษ และภาษาอื่นๆ',
    price: 15000,
    category: 'ui-ux',
    level: 'standard',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 3,
    icon: '🌍',
  },
  {
    id: 'drag-drop-builder',
    name: 'Drag & Drop Builder',
    description: 'สร้างและจัดการ Content หรือ Layout ด้วยการลากวาง',
    price: 35000,
    category: 'ui-ux',
    level: 'premium',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 7,
    icon: '🎨',
  },
  
  // ============ AUTH Features ============
  {
    id: 'email-password-auth',
    name: 'Login Email/Password',
    description: 'ระบบ Login พื้นฐานด้วย Email และ Password พร้อม Session Management',
    price: 10000,
    category: 'auth',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 2,
    icon: '🔐',
    isPopular: true,
  },
  {
    id: 'social-login',
    name: 'Social Login',
    description: 'Login ผ่าน Google, Facebook, LINE และ Social Media อื่นๆ',
    price: 12000,
    category: 'auth',
    level: 'standard',
    dependencies: ['email-password-auth'],
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 2,
    icon: '🔗',
    isPopular: true,
  },
  {
    id: 'two-factor-auth',
    name: 'Two-Factor Authentication',
    description: 'ยืนยันตัวตน 2 ชั้น ผ่าน SMS, Email หรือ Authenticator App',
    price: 15000,
    category: 'auth',
    level: 'standard',
    dependencies: ['email-password-auth'],
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 3,
    icon: '🔒',
  },
  {
    id: 'role-based-access',
    name: 'Role-Based Access Control',
    description: 'ระบบจัดการสิทธิ์ผู้ใช้แบบ Role และ Permission ละเอียด',
    price: 20000,
    category: 'auth',
    level: 'standard',
    dependencies: ['user-management'],
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 4,
    icon: '👥',
    isPopular: true,
  },
  {
    id: 'biometric-auth',
    name: 'Biometric Authentication',
    description: 'ยืนยันตัวตนด้วย Face ID, Touch ID และลายนิ้วมือ',
    price: 18000,
    category: 'auth',
    level: 'premium',
    dependencies: ['email-password-auth'],
    recommendedFor: ['mobile-app'],
    estimatedDays: 3,
    icon: '👆',
  },
  
  // ============ BACKEND Features ============
  {
    id: 'rest-api',
    name: 'REST API',
    description: 'พัฒนา API แบบ RESTful พร้อม Documentation และ Rate Limiting',
    price: 25000,
    category: 'backend',
    level: 'standard',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 5,
    icon: '🔌',
    isPopular: true,
  },
  {
    id: 'graphql-api',
    name: 'GraphQL API',
    description: 'API แบบ GraphQL สำหรับ Query ข้อมูลที่ยืดหยุ่น',
    price: 35000,
    category: 'backend',
    level: 'premium',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 7,
    icon: '🔮',
  },
  {
    id: 'file-upload',
    name: 'ระบบอัพโหลดไฟล์',
    description: 'อัพโหลดไฟล์และรูปภาพ พร้อม Resize, Compress และ CDN',
    price: 12000,
    category: 'backend',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 2,
    icon: '📁',
  },
  {
    id: 'search-engine',
    name: 'ระบบค้นหาขั้นสูง',
    description: 'Full-text Search พร้อม Filter, Sort และ Faceted Search',
    price: 25000,
    category: 'backend',
    level: 'premium',
    recommendedFor: ['web-app', 'internal-system', 'saas'],
    estimatedDays: 5,
    icon: '🔍',
  },
  
  // ============ DATABASE Features ============
  {
    id: 'database-setup',
    name: 'ออกแบบ Database',
    description: 'ออกแบบโครงสร้าง Database, Schema และ Migration',
    price: 15000,
    category: 'database',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 3,
    icon: '🗄️',
    isPopular: true,
  },
  {
    id: 'backup-restore',
    name: 'Backup & Restore',
    description: 'ระบบสำรองข้อมูลอัตโนมัติและกู้คืนข้อมูลได้ทุกเมื่อ',
    price: 10000,
    category: 'database',
    level: 'standard',
    dependencies: ['database-setup'],
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 2,
    icon: '💾',
  },
  {
    id: 'data-migration',
    name: 'Data Migration',
    description: 'ย้ายข้อมูลจากระบบเก่ามาระบบใหม่อย่างปลอดภัย',
    price: 20000,
    category: 'database',
    level: 'standard',
    dependencies: ['database-setup'],
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 4,
    icon: '📤',
  },
  
  // ============ INTEGRATION Features ============
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    description: 'รับชำระเงินผ่าน Credit Card, PromptPay และ Mobile Banking',
    price: 30000,
    category: 'integration',
    level: 'premium',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 5,
    icon: '💳',
    isPopular: true,
  },
  {
    id: 'email-service',
    name: 'Email Service',
    description: 'ส่งอีเมลอัตโนมัติ ยืนยันตัวตน แจ้งเตือน และ Marketing',
    price: 12000,
    category: 'integration',
    level: 'standard',
    recommendedFor: ['web-app', 'internal-system', 'saas'],
    estimatedDays: 2,
    icon: '📧',
  },
  {
    id: 'sms-service',
    name: 'SMS Service',
    description: 'ส่ง SMS แจ้งเตือน OTP และข้อความ Transactional',
    price: 10000,
    category: 'integration',
    level: 'standard',
    recommendedFor: ['mobile-app', 'internal-system', 'saas'],
    estimatedDays: 2,
    icon: '📱',
  },
  {
    id: 'line-integration',
    name: 'LINE Integration',
    description: 'เชื่อมต่อ LINE Official Account, LINE Login และ LINE Notify',
    price: 18000,
    category: 'integration',
    level: 'standard',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 3,
    icon: '💚',
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'แสดงแผนที่ ค้นหาตำแหน่ง และคำนวณเส้นทาง',
    price: 15000,
    category: 'integration',
    level: 'standard',
    recommendedFor: ['web-app', 'mobile-app'],
    estimatedDays: 3,
    icon: '🗺️',
  },
  
  // ============ ANALYTICS Features ============
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Dashboard แสดงสถิติ Traffic, User Behavior และ Conversion',
    price: 20000,
    category: 'analytics',
    level: 'standard',
    recommendedFor: ['web-app', 'mobile-app', 'saas'],
    estimatedDays: 4,
    icon: '📈',
    isPopular: true,
  },
  {
    id: 'custom-reports',
    name: 'รายงานแบบกำหนดเอง',
    description: 'สร้างรายงานตามต้องการ Export PDF และ Excel',
    price: 25000,
    category: 'analytics',
    level: 'premium',
    dependencies: ['analytics-dashboard'],
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 5,
    icon: '📋',
  },
  {
    id: 'audit-log',
    name: 'Audit Log',
    description: 'บันทึกการกระทำทุกอย่างในระบบ ติดตามย้อนหลังได้',
    price: 15000,
    category: 'analytics',
    level: 'standard',
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 3,
    icon: '📝',
  },
  
  // ============ SECURITY Features ============
  {
    id: 'ssl-certificate',
    name: 'SSL Certificate',
    description: 'ติดตั้ง SSL/TLS Certificate สำหรับความปลอดภัย HTTPS',
    price: 5000,
    category: 'security',
    level: 'basic',
    recommendedFor: ['web-app', 'mobile-app', 'internal-system', 'saas'],
    estimatedDays: 1,
    icon: '🛡️',
    isPopular: true,
  },
  {
    id: 'data-encryption',
    name: 'Data Encryption',
    description: 'เข้ารหัสข้อมูลสำคัญ ทั้ง At-rest และ In-transit',
    price: 15000,
    category: 'security',
    level: 'standard',
    recommendedFor: ['internal-system', 'saas'],
    estimatedDays: 3,
    icon: '🔐',
  },
  {
    id: 'ddos-protection',
    name: 'DDoS Protection',
    description: 'ป้องกันการโจมตี DDoS และ Rate Limiting',
    price: 20000,
    category: 'security',
    level: 'premium',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 3,
    icon: '🛡️',
  },
  
  // ============ PERFORMANCE Features ============
  {
    id: 'caching-system',
    name: 'Caching System',
    description: 'ระบบ Cache ช่วยให้โหลดเร็วขึ้น Redis, CDN และ Browser Cache',
    price: 15000,
    category: 'performance',
    level: 'standard',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 3,
    icon: '⚡',
  },
  {
    id: 'load-balancing',
    name: 'Load Balancing',
    description: 'กระจายโหลดไปหลาย Server รองรับผู้ใช้จำนวนมาก',
    price: 25000,
    category: 'performance',
    level: 'premium',
    recommendedFor: ['saas'],
    estimatedDays: 4,
    icon: '⚖️',
  },
  {
    id: 'offline-mode',
    name: 'Offline Mode',
    description: 'ใช้งานได้แม้ไม่มีอินเทอร์เน็ต Sync เมื่อกลับมาออนไลน์',
    price: 25000,
    category: 'performance',
    level: 'premium',
    recommendedFor: ['mobile-app'],
    estimatedDays: 5,
    icon: '📴',
  },
  
  // ============ SUPPORT Features ============
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'หน้าจัดการระบบสำหรับผู้ดูแล จัดการข้อมูลทุกอย่าง',
    price: 30000,
    category: 'support',
    level: 'standard',
    dependencies: ['user-management', 'role-based-access'],
    recommendedFor: ['web-app', 'internal-system', 'saas'],
    estimatedDays: 6,
    icon: '⚙️',
    isPopular: true,
  },
  {
    id: 'help-center',
    name: 'Help Center',
    description: 'ศูนย์ช่วยเหลือ FAQ, Knowledge Base และ Tutorial',
    price: 18000,
    category: 'support',
    level: 'standard',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 4,
    icon: '❓',
  },
  {
    id: 'live-chat',
    name: 'Live Chat Support',
    description: 'ระบบแชทสดติดต่อ Support Team แบบ Real-time',
    price: 15000,
    category: 'support',
    level: 'standard',
    recommendedFor: ['web-app', 'saas'],
    estimatedDays: 3,
    icon: '💬',
  },
  
  // ============ ADDON Features ============
  {
    id: 'push-notifications',
    name: 'Push Notifications',
    description: 'ส่ง Push Notification ไปยังมือถือและ Browser',
    price: 12000,
    category: 'addon',
    level: 'standard',
    recommendedFor: ['mobile-app', 'web-app'],
    estimatedDays: 2,
    icon: '🔔',
    isPopular: true,
  },
  {
    id: 'multi-tenant',
    name: 'Multi-Tenant Architecture',
    description: 'รองรับหลายองค์กรในระบบเดียว แยก Data และ Setting',
    price: 50000,
    category: 'addon',
    level: 'premium',
    recommendedFor: ['saas'],
    estimatedDays: 10,
    icon: '🏘️',
  },
  {
    id: 'subscription-billing',
    name: 'Subscription Billing',
    description: 'ระบบเก็บค่าสมาชิกรายเดือน/ปี พร้อม Invoice และ Receipt',
    price: 35000,
    category: 'addon',
    level: 'premium',
    dependencies: ['payment-gateway'],
    recommendedFor: ['saas'],
    estimatedDays: 7,
    icon: '💵',
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    description: 'จัดการ API Keys, Rate Limiting และ API Monetization',
    price: 40000,
    category: 'addon',
    level: 'premium',
    dependencies: ['rest-api'],
    recommendedFor: ['saas'],
    estimatedDays: 8,
    icon: '🚪',
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    description: 'ปรับแต่ง SEO, Meta Tags, Sitemap และ Schema Markup',
    price: 15000,
    category: 'addon',
    level: 'standard',
    recommendedFor: ['web-app'],
    estimatedDays: 3,
    icon: '🎯',
  },
  {
    id: 'ldap-integration',
    name: 'LDAP/AD Integration',
    description: 'เชื่อมต่อ Active Directory หรือ LDAP สำหรับ Single Sign-On',
    price: 25000,
    category: 'addon',
    level: 'premium',
    dependencies: ['email-password-auth'],
    recommendedFor: ['internal-system'],
    estimatedDays: 5,
    icon: '🔄',
  },

  // ============ QUEUE MANAGEMENT Features ============
  // Queue Core
  {
    id: 'queue-core-management',
    name: 'ระบบจัดการคิวหลัก',
    description: 'สร้าง/จัดการคิว, ระบบเรียกคิว, ข้ามคิว, โอนคิว, ยกเลิกคิว และจัดลำดับความสำคัญ (Priority Queue)',
    price: 45000,
    category: 'core',
    level: 'premium',
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 8,
    icon: '🎫',
    isPopular: true,
  },
  {
    id: 'queue-service-types',
    name: 'ประเภทบริการ/แผนก',
    description: 'ตั้งค่าประเภทบริการหลายแผนก เช่น ฝาก-ถอน, เปิดบัญชี, ชำระบิล, ซื้อ-ขาย พร้อมเวลาบริการโดยเฉลี่ย',
    price: 20000,
    category: 'core',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 4,
    icon: '📋',
  },
  {
    id: 'queue-counter-management',
    name: 'ระบบจัดการเคาน์เตอร์',
    description: 'เปิด/ปิดเคาน์เตอร์, กำหนดพนักงานประจำเคาน์เตอร์, ตั้งค่าประเภทบริการแต่ละเคาน์เตอร์',
    price: 25000,
    category: 'core',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 5,
    icon: '🪟',
  },
  {
    id: 'queue-staff-interface',
    name: 'หน้าจอพนักงาน (Staff Interface)',
    description: 'หน้าจอสำหรับพนักงานเรียกคิว ข้ามคิว โอนคิว บันทึกหมายเหตุ และสรุปการให้บริการ',
    price: 30000,
    category: 'core',
    level: 'standard',
    dependencies: ['queue-core-management', 'queue-counter-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 6,
    icon: '👨‍💼',
    isPopular: true,
  },

  // Queue Display System
  {
    id: 'queue-display-main',
    name: 'จอแสดงคิวหลัก (Main Display)',
    description: 'หน้าจอขนาดใหญ่แสดงหมายเลขคิวที่กำลังให้บริการ, คิวรอ, เคาน์เตอร์ และข้อมูลสรุป',
    price: 35000,
    category: 'ui-ux',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 6,
    icon: '🖥️',
    isPopular: true,
  },
  {
    id: 'queue-display-counter',
    name: 'จอแสดงหน้าเคาน์เตอร์',
    description: 'จอขนาดเล็กแสดงหมายเลขคิวที่ให้บริการอยู่ ติดตั้งหน้าเคาน์เตอร์แต่ละจุด',
    price: 15000,
    category: 'ui-ux',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 3,
    icon: '📺',
  },
  {
    id: 'queue-audio-announcement',
    name: 'ระบบเสียงเรียกคิว',
    description: 'ประกาศเสียงเรียกหมายเลขคิวอัตโนมัติ รองรับหลายภาษา (TH/EN/CH)',
    price: 20000,
    category: 'ui-ux',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 4,
    icon: '🔊',
    isPopular: true,
  },
  {
    id: 'queue-display-media',
    name: 'สื่อโฆษณา/ประชาสัมพันธ์บนจอคิว',
    description: 'แสดงวิดีโอ, รูปภาพ, ข่าวสารบนจอแสดงคิว สลับกับข้อมูลคิว',
    price: 18000,
    category: 'ui-ux',
    level: 'standard',
    dependencies: ['queue-display-main'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 3,
    icon: '🎬',
  },

  // Customer Interface
  {
    id: 'queue-kiosk-ticket',
    name: 'ตู้กดบัตรคิว (Kiosk)',
    description: 'หน้าจอสำหรับตู้กดบัตรคิว เลือกประเภทบริการ, สแกน QR พิมพ์บัตรคิว',
    price: 30000,
    category: 'ui-ux',
    level: 'premium',
    dependencies: ['queue-core-management', 'queue-service-types'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 5,
    icon: '🖨️',
    isPopular: true,
  },
  {
    id: 'queue-mobile-app',
    name: 'จองคิวผ่านมือถือ',
    description: 'แอป/เว็บจองคิวล่วงหน้า ดูสถานะคิว แจ้งเตือนเมื่อใกล้ถึงคิว',
    price: 40000,
    category: 'ui-ux',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'mobile-app'],
    estimatedDays: 8,
    icon: '📱',
    isPopular: true,
  },
  {
    id: 'queue-qr-checkin',
    name: 'เช็คอินด้วย QR Code',
    description: 'สแกน QR Code เพื่อรับคิว หรือเช็คอินสำหรับคิวที่จองไว้',
    price: 15000,
    category: 'ui-ux',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'mobile-app', 'internal-system'],
    estimatedDays: 3,
    icon: '📷',
  },
  {
    id: 'queue-wait-time-estimate',
    name: 'ประมาณการเวลารอคิว',
    description: 'คำนวณและแสดงเวลารอคิวโดยประมาณ อ้างอิงจากสถิติและจำนวนคิวรอ',
    price: 25000,
    category: 'analytics',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 5,
    icon: '⏱️',
    isPopular: true,
  },

  // Queue Notifications
  {
    id: 'queue-sms-notification',
    name: 'แจ้งเตือนคิวผ่าน SMS',
    description: 'ส่ง SMS แจ้งเตือนเมื่อใกล้ถึงคิว (เหลือ 3 คิว, ถึงคิว)',
    price: 15000,
    category: 'integration',
    level: 'standard',
    dependencies: ['queue-core-management', 'sms-service'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 2,
    icon: '📲',
  },
  {
    id: 'queue-line-notification',
    name: 'แจ้งเตือนคิวผ่าน LINE',
    description: 'ส่ง LINE แจ้งเตือนสถานะคิว พร้อมลิงก์ดูคิวแบบ Real-time',
    price: 20000,
    category: 'integration',
    level: 'standard',
    dependencies: ['queue-core-management', 'line-integration'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 3,
    icon: '💚',
    isPopular: true,
  },

  // Queue Booking & Appointment
  {
    id: 'queue-appointment-booking',
    name: 'ระบบนัดหมายล่วงหน้า',
    description: 'จองคิวล่วงหน้า เลือกวัน/เวลา/สาขา ยืนยันผ่าน SMS/LINE/Email',
    price: 35000,
    category: 'core',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'mobile-app'],
    estimatedDays: 7,
    icon: '📅',
    isPopular: true,
  },
  {
    id: 'queue-vip-priority',
    name: 'ระบบลูกค้า VIP/Priority',
    description: 'จัดการลูกค้า VIP, ผู้สูงอายุ, ผู้พิการ คิวลัดพิเศษ และบริการพิเศษ',
    price: 18000,
    category: 'core',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 3,
    icon: '⭐',
  },

  // Queue Analytics & Reporting
  {
    id: 'queue-realtime-dashboard',
    name: 'Dashboard สถานะคิว Real-time',
    description: 'แดชบอร์ดแสดงสถานะคิวทุกสาขาแบบ Real-time จำนวนรอ, เวลาเฉลี่ย, ปริมาณงาน',
    price: 30000,
    category: 'analytics',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 6,
    icon: '📊',
    isPopular: true,
  },
  {
    id: 'queue-analytics-report',
    name: 'รายงานวิเคราะห์คิว',
    description: 'รายงานสถิติ: เวลารอเฉลี่ย, Peak Hours, ปริมาณคิวรายวัน/สัปดาห์/เดือน, ประสิทธิภาพพนักงาน',
    price: 35000,
    category: 'analytics',
    level: 'premium',
    dependencies: ['queue-core-management', 'analytics-dashboard'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 7,
    icon: '📈',
    isPopular: true,
  },
  {
    id: 'queue-customer-feedback',
    name: 'ระบบประเมินความพึงพอใจ',
    description: 'แบบสอบถามหลังรับบริการ ให้คะแนน 1-5 ดาว, Comment และรายงานสรุป',
    price: 20000,
    category: 'analytics',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 4,
    icon: '⭐',
  },

  // Queue Multi-Branch
  {
    id: 'queue-multi-branch',
    name: 'ระบบหลายสาขา',
    description: 'จัดการคิวหลายสาขา แยกข้อมูลแต่ละสาขา รายงานรวมศูนย์',
    price: 40000,
    category: 'addon',
    level: 'premium',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 8,
    icon: '🏢',
  },
  {
    id: 'queue-operating-hours',
    name: 'ตั้งค่าเวลาให้บริการ',
    description: 'กำหนดเวลาเปิด-ปิด, วันหยุด, ช่วงพักเที่ยง แต่ละสาขา/แผนก',
    price: 12000,
    category: 'addon',
    level: 'standard',
    dependencies: ['queue-core-management'],
    recommendedFor: ['web-app', 'internal-system'],
    estimatedDays: 2,
    icon: '🕐',
  },

  // Queue Hardware Integration
  {
    id: 'queue-printer-integration',
    name: 'เชื่อมต่อเครื่องพิมพ์บัตรคิว',
    description: 'รองรับเครื่องพิมพ์ Thermal Printer ยี่ห้อทั่วไป (Epson, Bixolon, etc.)',
    price: 20000,
    category: 'integration',
    level: 'premium',
    dependencies: ['queue-kiosk-ticket'],
    recommendedFor: ['internal-system'],
    estimatedDays: 4,
    icon: '🖨️',
  },
  {
    id: 'queue-display-hardware',
    name: 'เชื่อมต่อจอแสดงผล',
    description: 'รองรับ LED Display, TV Display และ Digital Signage',
    price: 15000,
    category: 'integration',
    level: 'standard',
    dependencies: ['queue-display-main'],
    recommendedFor: ['internal-system'],
    estimatedDays: 3,
    icon: '📺',
  },
];

export class MockFeatureRepository implements IFeatureRepository {
  private features: Feature[] = [...MOCK_FEATURES];
  private projectTypes: ProjectTypeConfig[] = [...PROJECT_TYPES];

  async getById(id: string): Promise<Feature | null> {
    await this.delay(50);
    return this.features.find((f) => f.id === id) || null;
  }

  async getAll(): Promise<Feature[]> {
    await this.delay(100);
    return [...this.features];
  }

  async getByProjectType(projectType: ProjectType): Promise<Feature[]> {
    await this.delay(100);
    return this.features.filter((f) => f.recommendedFor.includes(projectType));
  }

  async getByCategory(category: FeatureCategory): Promise<Feature[]> {
    await this.delay(100);
    return this.features.filter((f) => f.category === category);
  }

  async getProjectTypes(): Promise<ProjectTypeConfig[]> {
    await this.delay(50);
    return [...this.projectTypes];
  }

  async getProjectTypeById(id: ProjectType): Promise<ProjectTypeConfig | null> {
    await this.delay(50);
    return this.projectTypes.find((p) => p.id === id) || null;
  }

  async validateDependencies(
    featureId: string,
    selectedIds: string[]
  ): Promise<{ valid: boolean; missingDependencies: Feature[] }> {
    await this.delay(50);
    
    const feature = this.features.find((f) => f.id === featureId);
    if (!feature || !feature.dependencies) {
      return { valid: true, missingDependencies: [] };
    }

    const missingDependencies = feature.dependencies
      .filter((depId) => !selectedIds.includes(depId))
      .map((depId) => this.features.find((f) => f.id === depId))
      .filter((f): f is Feature => f !== undefined);

    return {
      valid: missingDependencies.length === 0,
      missingDependencies,
    };
  }

  async getStats(): Promise<FeatureStats> {
    await this.delay(100);

    const byCategory: Record<FeatureCategory, number> = {
      core: 0,
      'ui-ux': 0,
      backend: 0,
      database: 0,
      auth: 0,
      integration: 0,
      analytics: 0,
      security: 0,
      performance: 0,
      support: 0,
      addon: 0,
    };

    const byProjectType: Record<ProjectType, number> = {
      'web-app': 0,
      'mobile-app': 0,
      'internal-system': 0,
      saas: 0,
    };

    let totalPrice = 0;

    this.features.forEach((f) => {
      byCategory[f.category]++;
      f.recommendedFor.forEach((pt) => byProjectType[pt]++);
      totalPrice += f.price;
    });

    return {
      totalFeatures: this.features.length,
      byCategory,
      byProjectType,
      averagePrice: Math.round(totalPrice / this.features.length),
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockFeatureRepository = new MockFeatureRepository();
