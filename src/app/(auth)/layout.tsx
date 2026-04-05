import { ThemeProvider } from "@/contexts/theme-context";
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
      </main>
    </ThemeProvider>
  );
}
