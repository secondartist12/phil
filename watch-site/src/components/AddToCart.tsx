"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { product } from "@/config/product";
import { QuantityStepper } from "./CartLines";

export function AddToCart({ compact = false }: { compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (compact) {
    return (
      <button type="button" className="btn-primary px-6 py-3.5 tracking-[0.06em]" onClick={() => add(product.id, 1)}>
        장바구니 담기
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <QuantityStepper value={qty} onChange={(n) => setQty(Math.max(1, n))} label="구매 수량" />
      <button type="button" className="btn-primary flex-1 tracking-[0.06em]" onClick={() => add(product.id, qty)}>
        장바구니 담기
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
