import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "./ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Contact"
      intro={<p>제품, 주문, 배송, 제휴 문의를 남겨 주세요. 작성한 내용은 사용 중인 메일 앱으로 전달되어 발송됩니다.</p>}
    >
      <ContactForm email={site.business.email} />
    </PageShell>
  );
}
