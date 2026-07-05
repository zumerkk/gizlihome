import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-md border border-obsidian/10 bg-white p-10 text-center">
      <Search className="mx-auto h-10 w-10 text-bronze" />
      <h3 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
        Sonuç bulunamadı.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        Filtreleri sadeleştirerek tekrar deneyin veya özel üretim için
        WhatsApp&apos;tan bize yazın.
      </p>
    </div>
  );
}
