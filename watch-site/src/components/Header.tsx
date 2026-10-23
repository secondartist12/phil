"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { displayBrand } from "@/config/site";
import { WheelMark } from "./WheelMark";

const NAV = [
  { href: "/#design", label: "Design" },
  { href: "/#details", label: "Details" },
  { href: "/product", label: "The Watch" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, ready, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
        scrolled || menuOpen
          ? "border-b border-white/[0.06] bg-obsidian/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:text-obsidian"
      >
        본문으로 건너뛰기
      </a>
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex items-center gap-3 text-white" aria-label={`${displayBrand()} 홈`}>
          <WheelMark className="h-7 w-7 transition-transform duration-700 group-hover:rotate-[144deg]" />
          <span className="font-display text-lg font-semibold uppercase tracking-[0.28em]">{displayBrand()}</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[11px] font-medium uppercase tracking-[0.26em] text-silver/80 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-racing-green transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="relative flex h-11 items-center gap-2 px-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white"
            aria-label={`장바구니 열기, ${ready ? count : 0}개 상품`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 7h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 7Z" />
              <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold tracking-normal transition-colors ${
                ready && count > 0 ? "bg-racing-green text-obsidian" : "bg-white/10 text-silver"
              }`}
            >
              {ready ? count : 0}
            </span>
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${menuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${menuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-obsidian lg:hidden"
      >
        <nav aria-label="모바일 메뉴" className="container-x flex flex-col py-8">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="display animate-fade-up border-b border-white/[0.06] py-5 text-5xl"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/cart" className="eyebrow mt-8">장바구니 →</Link>
        </nav>
      </div>
    </header>
  );
}
