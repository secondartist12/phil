"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/format";
import { CartLines } from "./CartLines";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setDrawerOpen(false), [pathname, setDrawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [drawerOpen, setDrawerOpen]);

  const close = () => setDrawerOpen(false);

  return (
    <div className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`} aria-hidden={!drawerOpen}>
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="장바구니"
        tabIndex={-1}
        inert={!drawerOpen}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-obsidian outline-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-6 md:h-20">
          <p className="eyebrow text-white">Your Cart</p>
          <button type="button" onClick={close} className="h-11 w-11 text-2xl text-white" aria-label="장바구니 닫기">
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          <CartLines onNavigate={close} />
        </div>
        {lines.length > 0 && (
          <div className="space-y-4 border-t border-white/[0.08] p-6">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="text-lg tabular-nums text-white">
                {subtotal === null ? "가격 확정 후 표시" : formatKRW(subtotal)}
              </span>
            </div>
            <Link href="/cart" className="btn-primary w-full tracking-[0.06em]" onClick={close}>
              장바구니 보기 · 주문하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
