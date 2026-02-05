import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
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
      <body className="flex flex-col min-h-screen">
        <NavigationWrapper />
        <main className="flex-grow pt-16 md:pt-20 pb-24 sm:pb-20">
          <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}