import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
