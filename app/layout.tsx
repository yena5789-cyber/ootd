import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "에나버스",
  description: "에나의 지인망 안에서 시작되는 비공개 소개",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
