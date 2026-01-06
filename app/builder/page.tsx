import { BuilderView } from "@/src/presentation/components/builder";
import { createServerBuilderPresenter } from "@/src/presentation/presenters/builder";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerBuilderPresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "สร้างใบเสนอราคา | Quotation Builder",
      description: "เลือกฟีเจอร์และสร้างใบเสนอราคาสำหรับโปรเจคซอฟต์แวร์",
    };
  }
}

/**
 * Builder Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function BuilderPage() {
  const presenter = createServerBuilderPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <BuilderView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching builder data:", error);

    // Fallback UI
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
