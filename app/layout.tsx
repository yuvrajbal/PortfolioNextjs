import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import { Toaster } from "sonner";
import ContactMe from "./ContactMe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuvraj Bal",
  description:
    "Full-stack developer focused on building modern web apps and impactful SaaS solutions. Experienced in startups and scaling side hustles.",
  metadataBase: new URL("https://yuvrajbal.com"),
  keywords: [
    "Yuvraj Bal",
    "Full-Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "SaaS Developer",
  ],
  creator: "Yuvraj Bal",
  authors: [{ name: "Yuvraj Bal" }],
  icons: {
    icon: [{ url: "/icon-192x192.png" }, { url: "/icon-512x512.png" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yuvrajbal.com",
    title: "Yuvraj Bal | Full-Stack Developer",
    description:
      "Full-stack developer focused on building modern web apps and impactful SaaS solutions.",
    siteName: "Yuvraj Bal Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yuvraj Bal - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvraj Bal | Full-Stack Developer",
    description:
      "Full-stack developer focused on building modern web apps and impactful SaaS solutions.",
    creator: "@YuvrajBal4",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code", // Add this when you have it
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900`}
      >
        <Toaster richColors closeButton position="top-center" />
        <Header />
        <main className="px-4 md:px-6 pb-24 md:pb-44 max-w-5xl mx-auto">
          {children}
        </main>
        <ContactMe />
      </body>
    </html>
  );
}
