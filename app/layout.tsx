import { MainLayout, ThemeProvider } from "@/src/presentation/components/layout";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Quotation Builder | สร้างใบเสนอราคาอย่างมืออาชีพ",
  description: "สร้างใบเสนอราคาสำหรับโปรเจค Web App, Mobile App, SaaS และระบบภายในองค์กร ด้วยระบบ Feature-based ที่ใช้งานง่าย",
  keywords: ["quotation", "proposal", "web development", "mobile app", "saas", "pricing"],
  authors: [{ name: "Quotation Builder Team" }],
  openGraph: {
    title: "Quotation Builder | สร้างใบเสนอราคาอย่างมืออาชีพ",
    description: "สร้างใบเสนอราคาสำหรับโปรเจค Web App, Mobile App, SaaS และระบบภายในองค์กร",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
