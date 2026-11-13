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
  metadataBase: new URL("https://chefmizan.cyou"),
  title: {
    default: "The Borders Unfolded | Global Geopolitics & Border Anomalies",
    template: "%s | The Borders Unfolded",
  },
  description:
    "Official investigative news and documentary platform by Chef Mizan. Exploring sovereign anomalies, border enclaves, historical treaties, and verified global geopolitics.",
  keywords: [
    "The Borders Unfolded",
    "Chef Mizan",
    "chefmizan.cyou",
    "Border Anomalies",
    "Llívia Enclave",
    "Baarle-Nassau",
    "Bir Tawil",
    "Geopolitics",
    "World Mysteries",
    "Pyrenees Treaty",
    "International Borders"
  ],
  authors: [{ name: "Chef Mizan", url: "https://chefmizan.cyou" }],
  creator: "Chef Mizan",
  publisher: "The Borders Unfolded Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "The Borders Unfolded | Global Geopolitics & Border Mysteries",
    description: "Investigating the world's most fascinating borders, enclaves, and historical treaties.",
    url: "https://chefmizan.cyou",
    siteName: "The Borders Unfolded",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "The Borders Unfolded - Global Border Anomalies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Borders Unfolded | Global Geopolitics & Border Anomalies",
    description: "Investigating the world's most unexplained border anomalies and sovereign treaties.",
    images: ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
