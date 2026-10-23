import type { Metadata } from "next";
import Link from "next/link";
import { faq } from "@/config/faq";
import { FaqList, PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "FAQ", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <PageShell
      eyebrow="Support"
      title="FAQ"
      intro={
        <p>
          확정되지 않은 정보는 추측하지 않고 &ldquo;확정 후 안내&rdquo;로 표시합니다. 찾는 답이 없다면{" "}
          <Link href="/contact" className="text-white underline underline-offset-4">문의하기</Link>를 이용하세요.
        </p>
      }
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqList items={faq} />
    </PageShell>
  );
}
