"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { MAX_QTY } from "@/lib/cart-limits";
import { product, productName } from "@/config/product";
import { formatKRW } from "@/lib/format";

export function QuantityStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex h-11 items-center border border-white/15" role="group" aria-label={label}>
      <button
        type="button"
        className="flex h-full w-11 items-center justify-center text-lg text-white transition-colors hover:bg-white/5 disabled:opacity-30"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="수량 줄이기"
      >
        −
      </button>
      <span className="w-10 text-center text-sm tabular-nums text-white" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="flex h-full w-11 items-center justify-center text-lg text-white transition-colors hover:bg-white/5 disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="수량 늘리기"
      >
        +
      </button>
    </div>
  );
}

/** Line items for both the drawer and the /cart page. */
export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQuantity, remove } = useCart();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6 py-10">
        <p className="text-sm text-silver/70">장바구니가 비어 있습니다.</p>
        <Link href="/product" className="btn-ghost" onClick={onNavigate}>
          Explore the Watch
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/[0.08]">
      {lines.map((line) => (
        <li key={line.productId} className="flex gap-5 py-6">
          <Link
            href="/product"
            onClick={onNavigate}
            className="relative h-28 w-24 shrink-0 overflow-hidden bg-carbon"
          >
            <Image src={product.images[0].src} alt="" fill sizes="96px" className="object-cover" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-semibold uppercase tracking-wider text-white">
                  {productName()}
                </p>
                <p className="mt-1 text-xs text-silver/60">{product.colorway}</p>
              </div>
              <p className="whitespace-nowrap text-sm tabular-nums text-white">
                {product.price === null ? "가격 미정" : formatKRW(product.price * line.quantity)}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <QuantityStepper
                value={line.quantity}
                onChange={(n) => setQuantity(line.productId, n)}
                label={`${productName()} 수량`}
              />
              <button
                type="button"
                onClick={() => remove(line.productId)}
                className="text-[11px] uppercase tracking-[0.2em] text-silver/60 underline-offset-4 hover:text-white hover:underline"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
