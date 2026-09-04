import Image from "next/image";
import { BadgeCheck, LockKeyhole, PackageCheck, Ruler } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";

const advantages = [
  {
    icon: LockKeyhole,
    title: "Gizli mekanizma",
    description: "Dışarıdan mobilya formunu bozmayan, içeride güvenli alan oluşturan sistem.",
  },
  {
    icon: Ruler,
    title: "Ölçüye göre üretim",
    description: "Ev, ofis, villa ve proje alanlarına göre ölçü ve yüzey uyarlaması.",
  },
  {
    icon: PackageCheck,
    title: "Montajlı teslim",
    description: "Paketleme, teslimat ve kullanım adımları satış temsilcisiyle netleştirilir.",
  },
  {
    icon: BadgeCheck,
    title: "Premium malzeme dili",
    description: "Koyu ahşap, bronz detay ve sade çizgiyle kurumsal bir görünüm.",
  },
];

export function BrandStory() {
  return (
    <section className="bg-cream py-20">
      <div className="site-container grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div
          data-reveal="left"
          data-tilt="true"
          className="premium-card group relative aspect-[4/4.8] overflow-hidden rounded-md border border-obsidian/10 bg-stone lg:aspect-[5/5]"
        >
          <Image
            src="/images/generated/feature-hidden-nightstand.webp"
            alt="GİZLİ HOME gizli bölmeli premium komodin"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/72 via-transparent to-transparent" />
          <div className="card-shine" />
          <div className="absolute bottom-5 left-5 right-5 rounded-md border border-bronze/25 bg-obsidian/72 p-5 text-cream backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-bronze">
              Marka Hikayesi
            </p>
            <p className="mt-2 font-serif text-3xl font-semibold leading-none">
              Mobilyanın görünmeyen tarafına tasarım ekliyoruz.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Kalite Vurgusu"
            title="Sade görünür. Detayda çalışır."
            description="GİZLİ HOME, güvenlik fikrini evin estetiğine zarar vermeden mobilyanın içine yerleştirir. Odak; gizli bölme, akıllı erişim ve premium yüzey bütünlüğüdür."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {advantages.map((advantage) => (
              <div
                key={advantage.title}
                data-reveal="up"
                className="premium-card rounded-md border border-obsidian/10 bg-white p-5"
              >
                <advantage.icon className="h-6 w-6 text-bronze" />
                <h3 className="mt-5 font-serif text-3xl font-semibold text-obsidian">
                  {advantage.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
