import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ['300', '400', '500', '600', '700', '800']
});

const jakartaHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Prime Property",
  description: "Platform manajemen properti terpercaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${jakartaSans.variable} ${jakartaHeading.variable} font-sans antialiased bg-prime-white text-prime-black`}>
        {children}
      </body>
    </html>
  );
}
