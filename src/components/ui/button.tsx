import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "premium-action inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-bronze text-obsidian shadow-[0_16px_40px_rgba(181,138,82,0.24)] hover:bg-[#caa062]",
        dark: "bg-obsidian text-cream hover:bg-charcoal",
        outline:
          "border border-bronze/45 bg-transparent text-cream hover:border-bronze hover:bg-bronze/10",
        light:
          "border border-obsidian/10 bg-white text-obsidian hover:border-bronze/40 hover:bg-stone/40",
        ghost: "text-obsidian hover:bg-obsidian/5",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-5",
        lg: "h-14 px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
