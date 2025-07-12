import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '@/lib/providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Builder Pro",
  description: "Plataforma para criação de lojas virtuais em minutos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={${geistSans.variable}  antialiased}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
