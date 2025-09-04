import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBarWrapper from "@/components/AppBarWrapper";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Tabeeb",
  description: "Healthcare made simple",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Providers>
          <AppBarWrapper />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
