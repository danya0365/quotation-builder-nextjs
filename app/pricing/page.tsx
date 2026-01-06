import { PricingView } from "@/src/presentation/components/pricing";
import { createServerPricingPresenter } from "@/src/presentation/presenters/pricing";
import type { Metadata } from "next";
import Link from "next/link";

// Dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerPricingPresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "ราคา | Quotation Builder",
      description: "ดูราคาแพ็คเกจพัฒนาซอฟต์แวร์",
    };
  }
}

/**
 * Pricing Page - Server Component
 */
export default async function PricingPage() {
  const presenter = createServerPricingPresenter();

  try {
    const viewModel = await presenter.getViewModel();

    return <PricingView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching pricing data:", error);

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
