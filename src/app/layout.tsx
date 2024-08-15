import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { CategoriesProvider } from "@/contexts/ReUsableData";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Providers from "@/providers/loaderProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        ></script>
      </head>
      <Analytics />
      <body className={poppins.className}>
        <AuthProvider>
          <CategoriesProvider>
            {" "}
            <ThemeProvider attribute="class" enableSystem>
              <main
                className={`flex min-h-screen flex-col ${poppins.className}`}
              >
                <Providers>{children}</Providers>
              </main>
              <Toaster />
            </ThemeProvider>
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
