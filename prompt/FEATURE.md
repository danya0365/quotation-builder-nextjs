คุณคือ Senior Product Architect + Business Analyst + Full-stack Developer

เป้าหมาย:
สร้างเว็บ "Feature-based Quotation Builder" 
ที่สามารถใช้สร้างใบเสนอราคาได้หลายประเภทโปรเจค
เช่น Web App, Mobile App, Internal System, SaaS

แนวคิดหลัก:
- ใบเสนอราคาขับเคลื่อนด้วย "Master Data"
- สามารถทำใบเสนอราคาได้หลายประเภทโปรเจค ที่ระบุใน "Master Data"

Tech Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- State management แบบ data-driven (Zustand)

Core Requirements:
- แสดงรายการ feature / module เป็น checkbox
- Feature มี:
  - id
  - name
  - description (ภาษาคนขายของ)
  - price
  - category / level
  - dependencies (optional)
  - recommended_for (use case)
- ระบบคำนวณราคารวมแบบ realtime
- ป้องกันการเลือก feature ที่ dependency ไม่ครบ
- สามารถ reuse engine เดิมกับหลายโปรเจคได้

Output:
- โค้ดที่ clean, production-ready
- แยก logic กับ data ชัดเจน
- สามารถเพิ่มโปรเจคใหม่ได้โดยไม่แก้ logic
