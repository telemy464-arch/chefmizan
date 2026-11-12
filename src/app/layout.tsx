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
  title: "The Borders Unfolded | Global Geopolitics & Border Anomalies",
  description:
    "Official investigative news and documentary platform by Chef Mizan. Exploring sovereign anomalies, border enclaves, treaties, and global geopolitics.",
  keywords: ["The Borders Unfolded", "Chef Mizan", "chefmizan.cyou", "Border Anomalies", "Llívia Enclave", "Geopolitics", "Pyrenees"],
  openGraph: {
    title: "The Borders Unfolded | Global Geopolitics & Border Mysteries",
    description: "Investigating the world's most fascinating borders, enclaves, and historical treaties.",
    url: "https://chefmizan.cyou",
    siteName: "The Borders Unfolded",
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
      <head>
        {/* Google Translate Hidden Engine */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b1120] text-slate-100 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
