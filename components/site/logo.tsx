import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "header" | "footer" | "hero";
}

// Intrinsic size matches cropped logo.png (tight to artwork, no extra transparent canvas)
const LOGO_WIDTH = 553;
const LOGO_HEIGHT = 536;

const LOGO_SHADOW_STYLE = {
  filter: "drop-shadow(0 5px 12px rgba(0,0,0,0.7)) drop-shadow(0 18px 36px rgba(0,0,0,0.55))",
};

const sizes = {
  header: { className: "h-14 w-auto sm:h-16 lg:h-20", shadow: false },
  footer: { className: "h-14 w-auto", shadow: false },
  hero: { className: "h-48 w-auto sm:h-56 lg:h-72", shadow: false },
};

export function Logo({ className, variant = "header" }: LogoProps) {
  const { className: sizeClass, shadow } = sizes[variant];

  return (
    <Link href="/" className={cn("inline-flex w-fit shrink-0 items-center", className)}>
      <Image
        src="/images/logo.png"
        alt="Elite Brokers NY — Buy, Sell, Rent Simplified"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn("block object-contain", sizeClass)}
        style={shadow ? LOGO_SHADOW_STYLE : undefined}
        priority={variant === "header" || variant === "hero"}
      />
    </Link>
  );
}
