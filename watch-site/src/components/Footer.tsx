import Link from "next/link";
import { displayBrand, site } from "@/config/site";
import { WheelMark } from "./WheelMark";

const LINKS = [
  {
    title: "Shop",
    items: [
      { href: "/product", label: "The Watch" },
      { href: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-returns", label: "배송 · 교환 · 반품" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/privacy", label: "개인정보처리방침" },
      { href: "/terms", label: "이용약관" },
    ],
  },
];

const v = (x: string | null) => x ?? "공개 전 입력 필요";

export function Footer() {
  const b = site.business;
  return (
    <footer className="relative border-t border-white/[0.06] bg-obsidian pb-28 pt-20 md:pb-12">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-3 text-white">
              <WheelMark className="h-8 w-8" />
              <span className="font-display text-xl font-semibold uppercase tracking-[0.28em]">{displayBrand()}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-silver/60">{site.description}</p>
          </div>
          {LINKS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-silver/80 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-12" />

        <div className="grid gap-8 text-[12px] leading-relaxed text-silver/50 md:grid-cols-2">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt>상호</dt><dd>{v(b.companyName)}</dd>
            <dt>대표자</dt><dd>{v(b.representative)}</dd>
            <dt>사업자등록번호</dt><dd>{v(b.registrationNumber)}</dd>
            <dt>통신판매업 신고</dt><dd>{v(b.mailOrderNumber)}</dd>
            <dt>주소</dt><dd>{v(b.address)}</dd>
            <dt>고객센터</dt><dd>{v(b.email)}</dd>
          </dl>
          <div className="space-y-3 md:text-right">
            <p>
              본 사이트의 제품은 특정 자동차 제조사 또는 부품 브랜드와 제휴·라이선스 관계가 없으며, 자동차 휠
              디자인에서 영감을 받은 독자 디자인입니다.
            </p>
            <p>일부 이미지는 연출된 광고 컷이며 실제 제품의 색감·질감과 다를 수 있습니다.</p>
            <p>© {new Date().getFullYear()} {displayBrand()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
