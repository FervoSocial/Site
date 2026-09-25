import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fervo Social — Conexões reais, no seu ritmo",
  description:
    "Fervo Social é uma nova comunidade social para adultos no Brasil.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/icons/fervo-chilli-flame-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/fervo-chilli-flame-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/icons/fervo-chilli-flame-192.png",
    apple: "/icons/fervo-chilli-flame-180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
