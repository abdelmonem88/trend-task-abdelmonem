import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "أداة انشاء استبيانات",
  description:
    "أداة انشاء استبيانات بطريقة ديناميكية وسهلة الاستخدام لإنشاء ومعاينة استبيانات بصفوف وأعمدة ديناميكية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster
          position="top-center"
          dir="rtl"
          richColors
          expand={true}
          closeButton={true}
        />
      </body>
    </html>
  );
}
