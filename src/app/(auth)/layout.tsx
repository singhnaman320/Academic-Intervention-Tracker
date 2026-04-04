import { ThemeProvider } from "@/contexts/theme-context";
import { SiteFooter } from "@/components/site-footer";
import { getSessionUser } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </main>
    </ThemeProvider>
  );
}
