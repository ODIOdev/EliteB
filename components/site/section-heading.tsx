import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ label, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {label && <p className="mb-2 text-sm font-medium text-muted-foreground">{label}</p>}
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-muted-foreground",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
