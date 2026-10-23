import Link from "next/link";
import { product, productName } from "@/config/product";
import { formatKRW } from "@/lib/format";
import { ProductGallery } from "../ProductGallery";
import { AddToCart } from "../AddToCart";

export function Showcase() {
  return (
    <section id="showcase" className="relative scroll-mt-20 bg-[#0B0C0F] py-28 md:py-40" aria-labelledby="showcase-title">
      <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div data-reveal>
          <ProductGallery images={product.images} />
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow" data-reveal>
            05 — Product Showcase
          </p>
          <h2 id="showcase-title" className="display mt-6 text-5xl sm:text-6xl md:text-7xl" data-reveal="mask">
            {productName()}
          </h2>
          {product.name === null && <p className="mt-3 text-xs text-silver/50">제품명 가칭 · 정식 명칭 확정 전</p>}
          <p className="mt-6 text-2xl tabular-nums text-white" data-reveal>
            {formatKRW(product.price)}
          </p>
          <p className="mt-6 max-w-md leading-relaxed text-silver/70" data-reveal>
            {product.summary}
          </p>

          <div className="mt-8 border border-white/[0.08] p-5 text-sm leading-relaxed text-silver/60" data-reveal>
            <p className="text-white">360° 뷰 안내</p>
            <p className="mt-2">
              현재 제공된 이미지는 정면 위주의 컷입니다. 실제 회전 촬영 이미지가 준비되기 전까지 존재하지 않는 각도를
              임의로 생성해 보여드리지 않습니다. 갤러리에서 확보된 컷을 넘겨 보고, 확대해 디테일을 확인하세요.
            </p>
          </div>

          <div className="mt-10 space-y-4" data-reveal>
            <AddToCart />
            <Link href="/product" className="btn-ghost w-full tracking-[0.06em]">
              상세 정보 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
