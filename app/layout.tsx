import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity";

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<{ siteTitle?: string } | null>({
    query: `*[_type == "siteSettings"][0] { siteTitle }`,
    tags: ['siteSettings'],
  }).catch(() => null)

  return {
    title: settings?.siteTitle || "Arcipelago Zero",
    description: "A beautiful minimal website",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="flex flex-col min-h-screen">
        <NavigationWrapper />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}