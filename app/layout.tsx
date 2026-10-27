import type { Metadata } from "next";
import "./globals.css";
import { AppDataProvider } from "@/components/app-data-provider";

export const metadata: Metadata = {
  title: "ARUNARA ATELIER — Wear the moment.",
  description: "Parfum lokal small-batch yang mudah dipakai setiap hari, namun tetap personal dan berkarakter.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <AppDataProvider>{children}</AppDataProvider>
      </body>
    </html>
  );
}
