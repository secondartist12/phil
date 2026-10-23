"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["제품 문의", "주문 · 결제", "배송", "교환 · 반품", "기타"];

/**
 * No backend inbox exists yet, so the form composes a mailto: link instead of
 * pretending to have "sent" anything.
 */
export function ContactForm({ email }: { email: string | null }) {
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const f = new FormData(e.currentTarget);
    const subject = `[${f.get("topic")}] ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("reply")})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const field =
    "mt-2 w-full border border-white/15 bg-transparent px-4 py-3.5 text-white placeholder:text-silver/30 transition-colors focus:border-racing-green focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="eyebrow block">
        이름
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="eyebrow block">
        회신 이메일
        <input name="reply" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="eyebrow block sm:col-span-2">
        문의 유형
        <select name="topic" className={`${field} bg-obsidian`} defaultValue={TOPICS[0]}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="eyebrow block sm:col-span-2">
        내용
        <textarea name="message" required rows={6} className={`${field} resize-y normal-case tracking-normal`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary tracking-[0.06em]" disabled={!email}>
          메일 앱으로 보내기
        </button>
        {!email && (
          <p className="mt-4 text-xs text-silver/60">고객센터 이메일이 아직 등록되지 않아 문의 접수가 준비 중입니다.</p>
        )}
        {opened && (
          <p role="status" className="mt-4 text-xs text-silver/70">
            메일 앱이 열렸습니다. 메일 앱에서 발송을 완료해야 문의가 접수됩니다.
          </p>
        )}
      </div>
    </form>
  );
}
