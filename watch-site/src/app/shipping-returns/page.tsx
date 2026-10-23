import type { Metadata } from "next";
import { PageShell, Prose, Pending } from "@/components/PageShell";
import { site } from "@/config/site";
import { formatKRW } from "@/lib/format";

export const metadata: Metadata = { title: "배송 · 교환 · 반품", alternates: { canonical: "/shipping-returns" } };

const val = (n: number | null) => (n === null ? <Pending /> : formatKRW(n));
const txt = (s: string | null) => (s === null ? <Pending /> : s);

export default function ShippingReturnsPage() {
  const s = site.shipping;
  return (
    <PageShell
      eyebrow="Support"
      title={<>Shipping &amp; Returns</>}
      intro={<p>배송 조건은 운영 확정 전입니다. 확정되지 않은 항목은 &ldquo;확정 후 안내&rdquo;로 표시됩니다.</p>}
    >
      <Prose>
        <section>
          <h2>배송 안내</h2>
          <dl className="grid grid-cols-[8rem_1fr] gap-y-3">
            <dt className="text-silver/60">배송사</dt><dd>{txt(s.carrier)}</dd>
            <dt className="text-silver/60">배송비</dt><dd>{val(s.fee)}</dd>
            <dt className="text-silver/60">무료배송 기준</dt><dd>{val(s.freeShippingThreshold)}</dd>
            <dt className="text-silver/60">출고 기간</dt><dd>{txt(s.leadTime)}</dd>
          </dl>
        </section>

        <section id="returns" className="scroll-mt-28">
          <h2>교환 · 반품 (청약철회)</h2>
          <ul>
            <li>
              「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 상품을 받은 날부터 <strong>7일 이내</strong> 청약철회를
              요청할 수 있습니다.
            </li>
            <li>
              상품이 표시·광고 내용과 다르거나 계약 내용과 다르게 이행된 경우, 상품을 받은 날부터 3개월 이내, 그 사실을
              안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회를 요청할 수 있습니다.
            </li>
            <li>
              단순 변심에 의한 반품 시 반품 배송비: {val(s.returnShippingFee)}
            </li>
            <li>
              고객의 책임 있는 사유로 상품이 멸실·훼손된 경우 등 법령이 정한 경우에는 청약철회가 제한될 수 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2>접수 방법</h2>
          <p>
            문의하기 페이지 또는 고객센터 이메일({site.business.email ?? <Pending />})로 주문 정보와 사유를 보내 주세요.
          </p>
        </section>

        <p className="border border-white/10 p-4 text-xs text-silver/60">
          운영자 안내: 이 페이지의 법령 요약은 일반 안내이며, 공개 전 실제 운영 조건과 함께 법률 검토가 필요합니다.
        </p>
      </Prose>
    </PageShell>
  );
}
