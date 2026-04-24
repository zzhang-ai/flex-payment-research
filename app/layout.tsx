import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flexible Payments Research Report",
  description: "Quant + Qual research findings on flexible payment scheduling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white text-slate-800 antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}
