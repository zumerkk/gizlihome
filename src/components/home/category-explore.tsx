import Link from "next/link";
import {
  Armchair,
  BriefcaseBusiness,
  Building2,
  DoorOpen,
  Layers3,
  LibraryBig,
  MonitorUp,
  Sofa,
} from "lucide-react";
import { productCategories } from "@/data/products";

const categoryMeta = [
  { icon: DoorOpen, href: "/urunler?category=Gizli%20Bölmeli%20Komodinler" },
  { icon: LibraryBig, href: "/urunler?category=Gizli%20Bölmeli%20Raflar" },
  { icon: Sofa, href: "/urunler?category=Gizli%20Bölmeli%20Sehpalar" },
  { icon: MonitorUp, href: "/urunler?category=TV%20Üniteleri" },
  { icon: Layers3, href: "/urunler?category=Konsollar" },
  { icon: BriefcaseBusiness, href: "/urunler?category=Ofis%20Mobilyaları" },
  { icon: Building2, href: "/proje-cozumleri" },
  { icon: Armchair, href: "/ozel-uretim" },
];

export function CategoryExplore() {
  return (
    <section className="bg-cream py-18 md:py-20">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-walnut">
            Kategorilere Göre Keşfet
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-none text-obsidian md:text-6xl">
            Her alan için gizli bir çözüm.
          </h2>
        </div>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, index) => {
            const meta = categoryMeta[index];
            const Icon = meta.icon;

            return (
              <Link
                key={category}
                href={meta.href}
                className="premium-card group flex min-h-36 flex-col justify-between overflow-hidden rounded-md border border-obsidian/10 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-obsidian text-bronze transition duration-300 group-hover:bg-bronze group-hover:text-obsidian">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-3xl font-semibold leading-none text-obsidian">
                  {category}
                </h3>
                <div className="card-shine" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
