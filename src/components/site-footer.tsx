import Link from "next/link";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <>
      <ScrollToTopButton />
      <footer id="site-footer" className="border-t border-border/80 bg-surface-strong/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
            <p>{siteConfig.tagline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>{siteConfig.owner}</span>
            <span aria-hidden="true">|</span>
            <Link href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              GitHub
            </Link>
            <span aria-hidden="true">|</span>
            <Link href={siteConfig.linkedInUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
