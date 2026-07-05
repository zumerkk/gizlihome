import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureList({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3 text-sm leading-6",
            dark ? "text-stone/85" : "text-muted",
          )}
        >
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-bronze/50 text-bronze">
            <Check className="h-3 w-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
