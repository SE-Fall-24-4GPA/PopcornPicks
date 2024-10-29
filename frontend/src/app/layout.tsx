import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PopCorn Picks",
  description: "Created by Jayesh Gajbhar, Swapnil Jakhi and Skanda Shastry",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col relative">
            {/* Background image with overlay */}
            <div className="fixed inset-0">
              <img
                src="/movie_collage.jpg"
                alt="background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/80" aria-hidden="true" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow flex items-center justify-center p-6">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}