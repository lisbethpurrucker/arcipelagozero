import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Arcipelago Zero",
  description: "A beautiful minimal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="pt-20 min-h-screen">
          <div className="max-w-5xl mx-auto px-12 py-12">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}