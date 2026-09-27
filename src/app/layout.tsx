import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sending Church",
  description: "A church that sends people into the world with the gospel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
