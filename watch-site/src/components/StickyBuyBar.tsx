"use client";

import { useEffect, useState } from "react";
import { product, productName } from "@/config/product";
import { formatKRW } from "@/lib/format";
import { AddToCart } from "./AddToCart";

/** Mobile-only fixed purchase bar; appears once the main buy box scrolls away. */
export function StickyBuyBar({ watchId }: { watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-obsidian/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-500 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!show}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold uppercase tracking-wider text-white">
            {productName()}
          </p>
          <p className="text-xs text-silver/70">{formatKRW(product.price)}</p>
        </div>
        <AddToCart compact />
      </div>
    </div>
  );
}
