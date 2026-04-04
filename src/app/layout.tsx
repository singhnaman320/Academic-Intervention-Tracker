import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/contexts/theme-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSessionUser } from "@/lib/auth";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academic Intervention Tracker",
  description:
    "Secure academic intervention management for teachers, coordinators, and school administrators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteHeader user={user} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
