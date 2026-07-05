import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  href?: string;
  tone?: "light" | "dark";
};

function LogoInner({ className, markClassName, tone = "light" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-obsidian",
        tone === "dark" && "text-cream",
        className,
      )}
    >
      <span
        className={cn(
          "relative grid h-12 w-10 place-items-center overflow-visible",
          markClassName,
        )}
        aria-hidden="true"
      >
        <Image
          src="/images/brand/gizli-home-door-mark.png"
          alt=""
          width={345}
          height={574}
          sizes="40px"
          className="h-12 w-auto object-contain drop-shadow-[0_8px_18px_rgba(181,138,82,0.2)]"
          priority
        />
      </span>
      <span className="leading-none">
        <span className="block font-serif text-[1.72rem] font-bold tracking-[0.06em] text-current">
          GİZLİ
        </span>
        <span className="block text-[0.66rem] font-semibold tracking-[0.52em] text-bronze">
          HOME
        </span>
      </span>
    </span>
  );
}

export function Logo({ href = "/", ...props }: LogoProps) {
  if (!href) {
    return <LogoInner {...props} />;
  }

  return (
    <Link href={href} aria-label="GİZLİ HOME ana sayfa">
      <LogoInner {...props} />
    </Link>
  );
}
