import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, Prose, Pending } from "@/components/PageShell";
import { displayBrand } from "@/config/site";

export const metadata: Metadata = { title: "이용약관", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms"
      intro={
        <p className="border border-racing-red/40 p-4 text-sm">
          초안 — 판매자 정보와 결제·배송 조건이 확정되면 갱신하고 법률 검토를 거친 뒤 게시해야 합니다.
        </p>
      }
    >
      <Prose>
        <section>
          <h2>제1조 (목적)</h2>
          <p>이 약관은 {displayBrand()}(이하 &ldquo;회사&rdquo;)가 운영하는 온라인 스토어에서 제공하는 상품 판매 서비스의 이용 조건을 정합니다.</p>
        </section>
        <section>
          <h2>제2조 (상품 정보)</h2>
          <ul>
            <li>상품 상세페이지에는 확인된 정보만 게시하며, 미확정 사양은 &ldquo;확정 후 안내&rdquo;로 표시합니다.</li>
            <li>일부 이미지는 연출된 광고 컷으로, 실제 상품의 색감·질감과 다를 수 있습니다.</li>
            <li>상품은 자동차 휠 디자인에서 영감을 받은 독자 디자인이며, 특정 자동차 제조사·부품 브랜드와 제휴 또는 라이선스 관계가 없습니다.</li>
          </ul>
        </section>
        <section>
          <h2>제3조 (주문 및 결제)</h2>
          <p>
            주문과 결제는 회사가 연동한 쇼핑몰 플랫폼의 결제 페이지에서 이루어지며, 결제 완료 시 계약이 성립합니다. 연동
            플랫폼: <Pending />
          </p>
        </section>
        <section>
          <h2>제4조 (배송 및 청약철회)</h2>
          <p>
            배송, 교환, 반품 조건은 <Link href="/shipping-returns" className="text-white underline underline-offset-4">배송 · 교환 · 반품 안내</Link>에 따릅니다.
          </p>
        </section>
        <section>
          <h2>제5조 (분쟁 해결)</h2>
          <p>관할 법원 및 분쟁 처리 절차: <Pending /></p>
        </section>
      </Prose>
    </PageShell>
  );
}
