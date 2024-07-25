import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { CategoriesProvider } from "@/contexts/ReUsableData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <body className={poppins.className}>
        <AuthProvider>
          <CategoriesProvider>
            {" "}
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
            >
              <main
                className={`flex min-h-screen flex-col ${poppins.className}`}
              >
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
