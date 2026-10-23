import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { product, productName } from "@/config/product";
import { faq } from "@/config/faq";
import { site } from "@/config/site";
import { formatKRW } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { CompareSlider } from "@/components/CompareSlider";
import { FaqList, Pending } from "@/components/PageShell";

export const metadata: Metadata = {
  title: productName(),
  description: product.summary,
  alternates: { canonical: "/product" },
  openGraph: { images: [{ url: product.images[0].src }] },
};

function SectionTitle({ n, title, ko }: { n: string; title: string; ko: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
      <h2 className="display text-4xl md:text-5xl">{title}</h2>
      <p className="eyebrow whitespace-nowrap">
        {n} · {ko}
      </p>
    </div>
  );
}

export default function ProductPage() {
  // JSON-LD lists only confirmed fields: no price/offer until a price exists,
  // and never reviews or ratings.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName(),
    description: product.summary,
    image: product.images.map((i) => `${site.url}${i.src}`),
    color: product.colorway,
    ...(product.price !== null && {
      offers: {
        "@type": "Offer",
        priceCurrency: product.currency,
        price: product.price,
        url: `${site.url}/product`,
      },
    }),
  };

  return (
    <div className="pb-24 pt-20 md:pb-0 md:pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1–2. Gallery + name / price / buy */}
      <section className="container-x grid gap-12 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <ProductGallery images={product.images} priority />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="경로" className="eyebrow mb-8">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span> The Watch
          </nav>
          <h1 className="display text-6xl md:text-7xl">{productName()}</h1>
          {product.name === null && <p className="mt-3 text-xs text-silver/50">제품명 가칭 · 정식 명칭 확정 전</p>}
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-silver/60">{product.colorway}</p>

          <p className="mt-8 text-3xl tabular-nums text-white">{formatKRW(product.price)}</p>

          <p className="mt-6 leading-relaxed text-silver/70">{product.summary}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {["Multi-Spoke Dial", "Red Hands", "Green Caliper Accent", "Black Link Bracelet"].map((t) => (
              <li key={t} className="border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-silver/80">
                {t}
              </li>
            ))}
          </ul>

          <div id="buy-box" className="mt-10 space-y-4">
            <AddToCart />
            {product.price === null && (
              <p className="text-xs leading-relaxed text-silver/50">
                가격 확정 및 결제 플랫폼 연동 전입니다. 장바구니에 담을 수 있지만 결제는 아직 진행되지 않습니다.
              </p>
            )}
          </div>

          <dl className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08] text-sm">
            <div className="flex justify-between py-4">
              <dt className="text-silver/60">배송</dt>
              <dd><Link href="/shipping-returns" className="text-white underline-offset-4 hover:underline">배송 안내 →</Link></dd>
            </div>
            <div className="flex justify-between py-4">
              <dt className="text-silver/60">교환 · 반품</dt>
              <dd><Link href="/shipping-returns#returns" className="text-white underline-offset-4 hover:underline">반품 안내 →</Link></dd>
            </div>
            <div className="flex justify-between py-4">
              <dt className="text-silver/60">보증</dt>
              <dd><Pending /></dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 3. Design features */}
      <section className="container-x py-24">
        <SectionTitle n="01" title="Design" ko="디자인 특징" />
        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-5">
          {product.features.map((f, i) => (
            <article key={f.key} className="group bg-obsidian" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <div className="relative aspect-square overflow-hidden">
                <Image src={f.image} alt={`${f.ko} 클로즈업`} fill sizes="(min-width:1024px) 20vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="font-display text-xl font-semibold uppercase tracking-wide text-white">{f.title}</p>
                <p className="mt-1 text-xs text-racing-green/80">{f.ko}</p>
                <p className="mt-3 text-sm leading-relaxed text-silver/70">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Wear images */}
      <section className="container-x py-24">
        <SectionTitle n="02" title="On the Wrist" ko="착용 이미지" />
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <figure className="relative aspect-square overflow-hidden bg-carbon" data-reveal>
            <Image src="/images/watch-wrist.jpg" alt="손목에 착용한 휠 다이얼 시계" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </figure>
          <figure className="relative aspect-square overflow-hidden bg-carbon md:aspect-auto" data-reveal>
            <Image src="/images/watch-garage.jpg" alt="어두운 차고와 스포츠카를 배경으로 한 휠 다이얼 시계" fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover object-[75%_50%]" />
            <figcaption className="absolute bottom-3 left-4 text-[11px] text-silver/60">연출된 광고 이미지</figcaption>
          </figure>
        </div>
        <p className="mt-4 text-xs text-silver/50">
          현재 확보된 착용 이미지는 1컷입니다. 추가 착용 컷(도심 야경, 차량 실내 등)은 실제 촬영본이 준비되면 업데이트합니다.
        </p>
      </section>

      {/* 5. Spec table */}
      <section className="container-x py-24">
        <SectionTitle n="03" title="Specifications" ko="상세 스펙" />
        <div className="grid gap-12 lg:grid-cols-[1fr_0.5fr]">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">제품 사양 — 확인됨 / 미확정 구분</caption>
            <thead>
              <tr className="border-b border-white/15 text-[11px] uppercase tracking-[0.2em] text-silver/50">
                <th scope="col" className="py-3 font-medium">항목</th>
                <th scope="col" className="py-3 font-medium">사양</th>
                <th scope="col" className="hidden py-3 font-medium sm:table-cell">상태</th>
              </tr>
            </thead>
            <tbody>
              {product.specs.map((s) => (
                <tr key={s.label} className="border-b border-white/[0.06]">
                  <th scope="row" className="py-4 pr-4 font-normal text-silver/60">{s.label}</th>
                  <td className="py-4 pr-4 text-white">
                    {s.value ?? <Pending />}
                    {s.note && <span className="ml-2 text-xs text-silver/50">({s.note})</span>}
                  </td>
                  <td className="hidden py-4 sm:table-cell">
                    {s.status === "visible" ? (
                      <span className="text-[11px] uppercase tracking-[0.16em] text-racing-green/80">이미지 확인</span>
                    ) : (
                      <span className="text-[11px] uppercase tracking-[0.16em] text-silver/40">미확정</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="h-fit border border-white/[0.08] p-6 text-sm leading-relaxed text-silver/60">
            <p className="text-white">스펙 표기 원칙</p>
            <p className="mt-3">
              <span className="text-racing-green/80">이미지 확인</span> 항목은 제공된 제품 이미지로 외관을 확인할 수 있는
              정보입니다. <span className="text-silver/80">미확정</span> 항목은 제조 사양이 확인되기 전까지 표시하지
              않습니다.
            </p>
          </aside>
        </div>
      </section>

      {/* 6. Styling comparison */}
      <section className="container-x py-24">
        <SectionTitle n="04" title="Styling" ko="스타일링 비교" />
        <div className="mx-auto max-w-4xl">
          <CompareSlider
            left={{ src: "/images/watch-garage-portrait.jpg", alt: "단독 제품 컷", label: "Product" }}
            right={{ src: "/images/watch-wrist.jpg", alt: "착용 컷", label: "Worn" }}
          />
          <p className="mt-4 text-xs text-silver/50">
            슬라이더를 움직여 단독 제품 컷과 실제 착용 컷을 비교해 보세요. 두 이미지 모두 원본 이미지이며 합성된
            비교 이미지가 아닙니다.
          </p>
        </div>
      </section>

      {/* 7. In the box */}
      <section className="container-x py-24">
        <SectionTitle n="05" title="In the Box" ko="상품 구성" />
        {product.inTheBox.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.inTheBox.map((item) => (
              <li key={item} className="border border-white/[0.08] p-6 text-white">{item}</li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 border border-dashed border-white/15 p-8 text-sm text-silver/70">
            <Pending />
            <p>시계 본체 외 구성품(케이스, 보증서, 설명서, 브레이슬릿 조절 공구 등 포함 여부)은 확정 후 안내합니다.</p>
          </div>
        )}
      </section>

      {/* 8. Shipping & returns summary */}
      <section className="container-x py-24">
        <SectionTitle n="06" title="Shipping & Returns" ko="배송 · 교환 · 반품" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["배송", "배송사 · 배송비 · 출고 기간은 확정 후 안내합니다."],
            ["청약철회", "상품을 받은 날부터 7일 이내 청약철회를 요청할 수 있습니다 (전자상거래법 기준)."],
            ["교환 · 반품 절차", "반품 배송비와 접수 방법은 배송·교환·반품 안내 페이지를 확인하세요."],
          ].map(([t, b]) => (
            <div key={t} className="border border-white/[0.08] p-6">
              <p className="font-display text-xl font-semibold uppercase tracking-wide text-white">{t}</p>
              <p className="mt-3 text-sm leading-relaxed text-silver/70">{b}</p>
            </div>
          ))}
        </div>
        <Link href="/shipping-returns" className="btn-ghost mt-8 tracking-[0.06em]">전체 안내 보기</Link>
      </section>

      {/* 9. FAQ */}
      <section className="container-x py-24">
        <SectionTitle n="07" title="FAQ" ko="자주 묻는 질문" />
        <div className="max-w-3xl">
          <FaqList items={faq.filter((f) => f.product)} />
        </div>
      </section>

      {/* 10. Purchase */}
      <section className="grain relative overflow-hidden border-t border-white/[0.06] py-28">
        <div className="container-x flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Ready to Drive</p>
            <p className="display mt-4 text-5xl md:text-7xl">{productName()}</p>
            <p className="mt-4 text-xl tabular-nums text-white">{formatKRW(product.price)}</p>
          </div>
          <div className="w-full max-w-md">
            <AddToCart />
          </div>
        </div>
      </section>

      <StickyBuyBar watchId="buy-box" />
    </div>
  );
}
