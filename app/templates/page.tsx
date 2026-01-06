import { TemplatesView } from "@/src/presentation/components/templates";
import { createServerTemplatesPresenter } from "@/src/presentation/presenters/templates";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerTemplatesPresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "เทมเพลต | Quotation Builder",
      description: "เลือกเทมเพลตใบเสนอราคาสำเร็จรูป",
    };
  }
}

/**
 * Templates Page - Server Component
 */
export default async function TemplatesPage() {
  const presenter = createServerTemplatesPresenter();

  try {
    const viewModel = await presenter.getViewModel();

    return <TemplatesView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching templates data:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูลได้</p>
          <Link
            href="/"
            className="main-btn main-btn-primary"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
