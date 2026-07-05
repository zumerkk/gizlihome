import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="site-container py-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition hover:text-obsidian"
          >
            <Home className="h-4 w-4" />
            Ana Sayfa
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-bronze" />
            {item.href ? (
              <Link href={item.href} className="transition hover:text-obsidian">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-obsidian">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
