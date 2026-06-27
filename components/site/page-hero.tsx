import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, description, align = "left", className, children }: PageHeroProps) {
  return (
    <section className={cn("border-b border-border bg-card shadow-sm", className)}>
      <div
        className={cn(
          "container mx-auto px-4 py-12 md:py-16 lg:px-8",
          align === "center" && "text-center"
        )}
      >
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
