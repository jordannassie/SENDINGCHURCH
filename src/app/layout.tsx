import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SENDING_LOGO } from "@/components/brand/Logo";
import { DemoAuthProvider } from "@/lib/demo/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sending",
  description:
    "Save the Lost. Train the Saved. Send the Trained. A simple church movement starting in Frisco, TX.",
  icons: {
    icon: SENDING_LOGO,
    apple: SENDING_LOGO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <DemoAuthProvider>{children}</DemoAuthProvider>
      </body>
    </html>
  );
}
