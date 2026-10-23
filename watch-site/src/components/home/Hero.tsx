"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // One rAF-throttled scroll listener writes a single CSS variable; all
  // parallax is composited transforms driven by that variable.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="grain relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-obsidian"
      style={{ ["--p" as string]: 0 }}
      aria-labelledby="hero-title"
    >
      {/* light: green underglow + red light trail */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 35% at 50% 58%, rgba(164,255,33,.16), transparent 70%), radial-gradient(70% 50% at 50% 100%, rgba(32,34,38,.9), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-[62%] -z-10 h-px overflow-hidden opacity-60">
        <div className="h-full w-1/2 animate-sweep bg-gradient-to-r from-transparent via-racing-red to-transparent" />
      </div>

      {/* giant outline word behind the watch */}
      <p
        aria-hidden="true"
        className="text-outline display pointer-events-none absolute left-1/2 top-[18%] -z-10 whitespace-nowrap text-[34vw] md:text-[24vw]"
        style={{ transform: "translate(-50%, calc(var(--p) * 40%))" }}
      >
        SPEED
      </p>

      {/* the watch */}
      <div
        className="absolute inset-x-0 top-14 bottom-[34%] -z-0 md:bottom-0 md:top-16"
        style={{ transform: "translateY(calc(var(--p) * 18%)) scale(calc(1 + var(--p) * .08))" }}
      >
        <div className="mx-auto flex h-full w-full max-w-[720px] animate-hero-in justify-center">
          {/* Box matches the photo's aspect so the vignette mask fades every edge to black. */}
          <div
            className="relative aspect-[604/1160] h-full max-w-full"
            style={{
              WebkitMaskImage: "radial-gradient(closest-side, #000 52%, transparent 100%)",
              maskImage: "radial-gradient(closest-side, #000 52%, transparent 100%)",
            }}
          >
            <Image
              src="/images/watch-rain.jpg"
              alt="블랙 케이스, 실버 멀티 스포크 다이얼, 레드 핸즈와 그린 캘리퍼 포인트를 가진 휠 다이얼 시계"
              fill
              priority
              sizes="(min-width: 768px) 520px, 80vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent"
      />

      {/* copy */}
      <div className="container-x relative pb-16 md:pb-20" style={{ opacity: "calc(1 - var(--p) * 1.6)" }}>
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow mb-5 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <span className="mr-3 inline-block h-px w-8 translate-y-[-3px] bg-racing-green" />
              Built for the Drive
            </p>
            <h1
              id="hero-title"
              className="display animate-fade-up text-[17vw] sm:text-[14vw] md:text-[10.5vw] xl:text-[9.5rem]"
              style={{ animationDelay: "450ms" }}
            >
              Inspired
              <br />
              by Speed<span className="text-racing-red">.</span>
            </h1>
            <p
              className="mt-6 max-w-md animate-fade-up text-base text-silver/80 md:text-lg"
              style={{ animationDelay: "650ms" }}
            >
              모터스포츠의 디자인을 손목 위에.
            </p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "800ms" }}>
            <Link href="#design" className="btn-primary group">
              Explore the Watch
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] uppercase tracking-ultra text-silver/50 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-0 animate-scroll-cue bg-racing-green" />
        </span>
      </div>
    </section>
  );
}
