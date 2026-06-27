"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Testimonial = (typeof TESTIMONIALS)[number];

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^a-zA-Z]/g, "")[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialThumbCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
          {getInitials(testimonial.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <div className="mb-2 flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
        ))}
      </div>
      <p className="line-clamp-4 flex-1 text-xs leading-relaxed text-muted-foreground italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>
    </div>
  );
}

function TestimonialFullCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card-md">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="mb-4 text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
      <div>
        <p className="font-semibold text-navy">{testimonial.name}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const slides = Array.from(container.children) as HTMLElement[];
    if (slides.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(containerCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    activeIndexRef.current = closestIndex;
  }, []);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slide = container.children[index] as HTMLElement | undefined;
    if (!slide) return;

    const left = slide.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2;
    container.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(index);
    activeIndexRef.current = index;
  }, []);

  const pauseAutoplay = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
  }, []);

  const resumeAutoplayLater = useCallback(() => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 5000);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateActiveIndex();
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const advance = () => {
      if (pausedRef.current || document.hidden) return;
      const next = (activeIndexRef.current + 1) % TESTIMONIALS.length;
      scrollTo(next);
    };

    const interval = setInterval(advance, 4500);

    container.addEventListener("touchstart", pauseAutoplay, { passive: true });
    container.addEventListener("touchend", resumeAutoplayLater, { passive: true });
    container.addEventListener("pointerdown", pauseAutoplay);
    container.addEventListener("pointerup", resumeAutoplayLater);

    const onVisibilityChange = () => {
      if (document.hidden) pauseAutoplay();
      else resumeAutoplayLater();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      clearTimeout(resumeTimeoutRef.current);
      container.removeEventListener("touchstart", pauseAutoplay);
      container.removeEventListener("touchend", resumeAutoplayLater);
      container.removeEventListener("pointerdown", pauseAutoplay);
      container.removeEventListener("pointerup", resumeAutoplayLater);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [pauseAutoplay, resumeAutoplayLater, scrollTo]);

  const handleDotClick = (index: number) => {
    pauseAutoplay();
    scrollTo(index);
    resumeAutoplayLater();
  };

  return (
    <section className="section-muted py-16 md:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-medium text-muted-foreground">Client Stories</p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[min(82vw,300px)] shrink-0 snap-center"
              >
                <TestimonialThumbCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`View testimonial from ${testimonial.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  activeIndex === index ? "w-6 bg-foreground" : "w-2 bg-border"
                )}
              />
            ))}
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialFullCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
