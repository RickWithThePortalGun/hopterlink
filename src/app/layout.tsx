import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";

const inter = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HopterLink - Find, Review, and Connect with Local Gems.",
  description: "Every review tells a story, every story shapes a community.",
  openGraph: {
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hopterlink - Find, Review, and Connect with Local Gems.",
    images: ["https://i.imgur.com/MPMcyPP.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <Analytics />
      <body className={inter.className}>
        <AuthProvider>
          {" "}
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <main className={`flex min-h-screen flex-col ${inter.className}`}>
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
