import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chef Mizan | Master Culinary Arts & Fine Dining",
  description:
    "Official website of Chef Mizan (chefmizan.cyou). Experience artisanal dishes, private dining, gourmet recipes, and table reservations.",
  keywords: ["Chef Mizan", "chefmizan.cyou", "Fine Dining", "Gourmet Cuisine", "Chef Portfolio", "Recipe Master"],
  openGraph: {
    title: "Chef Mizan | Master Culinary Arts",
    description: "Experience artisanal dishes, private dining, and table reservations.",
    url: "https://chefmizan.cyou",
    siteName: "Chef Mizan",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-black min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
