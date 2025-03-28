import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Legal",
  description: "Strategic business consulting services for sustainable growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
