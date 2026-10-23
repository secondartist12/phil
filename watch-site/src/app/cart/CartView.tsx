"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/format";
import { site } from "@/config/site";
import { CartLines } from "@/components/CartLines";

export function CartView({
  checkoutReady,
  provider,
  priceSet,
}: {
  checkoutReady: boolean;
  provider: string | null;
  priceSet: boolean;
}) {
  const { lines, subtotal, count, ready } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; message?: string };
      if (res.ok && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }
      setError(data.message ?? "체크아웃을 시작하지 못했습니다.");
    } catch {
      setError("네트워크 오류로 체크아웃을 시작하지 못했습니다.");
    }
    setPending(false);
  }

  if (!ready) return <div className="h-40" aria-busy="true" />;

  const shippingFee = site.shipping.fee;

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_380px]">
      <div>
        <CartLines />
      </div>

      {lines.length > 0 && (
        <aside className="h-fit border border-white/[0.08] p-6 lg:sticky lg:top-28" aria-label="주문 요약">
          <p className="eyebrow text-white">Order Summary</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-silver/60">상품 수량</dt>
              <dd className="tabular-nums text-white">{count}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-silver/60">상품 금액</dt>
              <dd className="tabular-nums text-white">{subtotal === null ? "가격 미정" : formatKRW(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-silver/60">배송비</dt>
              <dd className="text-white">{shippingFee === null ? "확정 후 안내" : formatKRW(shippingFee)}</dd>
            </div>
          </dl>
          <div className="hairline my-6" />

          {checkoutReady ? (
            <>
              <button type="button" className="btn-primary w-full tracking-[0.06em]" onClick={checkout} disabled={pending}>
                {pending ? "결제 페이지로 이동 중…" : "결제하기"}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-silver/50">
                {provider} 보안 결제 페이지로 이동합니다. 최종 금액과 배송비는 결제 페이지에서 확정됩니다. 카드 정보는 이
                사이트에 저장되지 않습니다.
              </p>
            </>
          ) : (
            <>
              <button type="button" className="btn-primary w-full tracking-[0.06em]" disabled aria-describedby="checkout-off">
                결제 준비 중
              </button>
              <div id="checkout-off" className="mt-4 space-y-2 border border-white/10 p-4 text-xs leading-relaxed text-silver/70">
                <p className="text-white">아직 주문할 수 없습니다.</p>
                {!priceSet && <p>· 판매 가격이 확정되지 않았습니다.</p>}
                {!provider && <p>· 결제 플랫폼(PG)이 연동되지 않았습니다.</p>}
                <p>모의 결제는 제공하지 않습니다. 장바구니는 이 브라우저에 저장되어 결제 오픈 후 그대로 이어서 주문할 수 있습니다.</p>
              </div>
            </>
          )}

          {error && (
            <p role="alert" className="mt-4 text-xs text-racing-red">
              {error}
            </p>
          )}

          <Link href="/shipping-returns" className="mt-6 block text-xs text-silver/60 underline-offset-4 hover:text-white hover:underline">
            배송 · 교환 · 반품 안내
          </Link>
        </aside>
      )}
    </div>
  );
}
