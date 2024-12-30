import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/navbar";
import AuthProvider from "@/components/providers/session-provider";

const nunito = Nunito({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Hritul's Workwise Assignment",
  description: "Seat Booking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${nunito.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
