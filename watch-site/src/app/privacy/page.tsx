import type { Metadata } from "next";
import { PageShell, Prose, Pending } from "@/components/PageShell";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "개인정보처리방침", alternates: { canonical: "/privacy" } };

const v = (s: string | null) => s ?? <Pending>공개 전 입력 필요</Pending>;

export default function PrivacyPage() {
  const b = site.business;
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy"
      intro={
        <p className="border border-racing-red/40 p-4 text-sm">
          초안 — 사업자 정보, 결제 플랫폼, 위탁 업체가 확정되면 내용을 갱신하고 법률 검토를 거친 뒤 게시해야 합니다.
        </p>
      }
    >
      <Prose>
        <section>
          <h2>1. 처리하는 개인정보 항목</h2>
          <ul>
            <li><strong>현재 이 사이트</strong>: 회원가입·로그인 기능이 없으며, 서버에 개인정보를 저장하지 않습니다.</li>
            <li>
              <strong>장바구니</strong>: 담은 상품과 수량만 이용자의 브라우저(localStorage)에 저장되며 서버로 전송되지
              않습니다.
            </li>
            <li>
              <strong>문의</strong>: 문의 양식은 이용자의 메일 앱을 통해 발송되며, 수신한 이메일 주소·이름·문의 내용은
              답변 목적으로만 이용합니다.
            </li>
            <li>
              <strong>주문·결제</strong>: 결제 플랫폼 연동 후, 주문자 정보(이름, 연락처, 배송지, 결제 정보)는 연동 플랫폼의
              결제 페이지에서 수집·처리됩니다. 플랫폼명: <Pending />
            </li>
          </ul>
        </section>
        <section>
          <h2>2. 처리 목적 및 보유 기간</h2>
          <p>
            주문 이행, 배송, 교환·반품 처리, 고객 문의 응대를 위해 이용하며, 관계 법령이 정한 기간(예: 전자상거래법상
            계약·청약철회 기록, 대금결제 기록 등) 동안 보관 후 파기합니다. 세부 보유 기간: <Pending />
          </p>
        </section>
        <section>
          <h2>3. 처리 위탁 및 제3자 제공</h2>
          <p>결제 대행, 배송 업체 등 위탁 현황: <Pending /></p>
        </section>
        <section>
          <h2>4. 정보주체의 권리</h2>
          <p>이용자는 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수 있으며, 아래 연락처로 요청할 수 있습니다.</p>
        </section>
        <section>
          <h2>5. 개인정보 보호책임자</h2>
          <dl className="grid grid-cols-[8rem_1fr] gap-y-2">
            <dt className="text-silver/60">상호</dt><dd>{v(b.companyName)}</dd>
            <dt className="text-silver/60">책임자</dt><dd>{v(b.privacyOfficer)}</dd>
            <dt className="text-silver/60">연락처</dt><dd>{v(b.email)}</dd>
          </dl>
        </section>
        <section>
          <h2>6. 시행일</h2>
          <p><Pending>게시일 확정 후 기재</Pending></p>
        </section>
      </Prose>
    </PageShell>
  );
}
