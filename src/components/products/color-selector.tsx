"use client";

import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  "Obsidyen Siyah": "#111111",
  Siyah: "#111111",
  Antrasit: "#252525",
  "Kırık Beyaz": "#E9E4DA",
  Beyaz: "#FFFFFF",
  "Safir Meşe": "#8A6A4D",
  "Füme & Doğal Meşe": "linear-gradient(135deg, #2b2b2b 0 50%, #a9835d 50%)",
  "Antrasit & Ceviz": "linear-gradient(135deg, #303030 0 50%, #5a3825 50%)",
  "Siyah & Ceviz": "linear-gradient(135deg, #111111 0 50%, #5a3825 50%)",
  Ceviz: "#4B3021",
  Krem: "#F7F5F0",
  "Koyu Ceviz": "#4B3021",
  Traverten: "#D7C5AA",
  "Projeye göre özel": "#B58A52",
};

type ColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
  compact?: boolean;
};

export function ColorSelector({
  colors,
  selectedColor,
  onChange,
  compact = false,
}: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Renk seçimi">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={selectedColor === color}
          aria-label={`${color} rengini seç`}
          onClick={() => onChange(color)}
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition",
            selectedColor === color
              ? "border-bronze bg-bronze/12 text-obsidian"
              : "border-obsidian/10 bg-white text-muted hover:border-bronze/45",
            compact && "min-h-9 px-2",
          )}
        >
          <span
            className="h-4 w-4 rounded-full border border-obsidian/15"
            style={{ background: colorMap[color] ?? "#B58A52" }}
            aria-hidden="true"
          />
          <span>{color}</span>
        </button>
      ))}
    </div>
  );
}
