import Image from "next/image";

export function OnTheWrist() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40" aria-labelledby="wrist-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="relative order-2 lg:order-1" data-reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[492px] overflow-hidden">
            <Image
              src="/images/watch-wrist.jpg"
              alt="흰 셔츠 소매 아래 손목에 착용한 휠 다이얼 시계와 블랙 체인 브레이슬릿"
              fill
              sizes="(min-width: 1024px) 492px, 100vw"
              className="object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute -bottom-6 -left-4 hidden h-24 w-24 border-b border-l border-racing-green/60 lg:block" />
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow" data-reveal>
            04 — On the Wrist
          </p>
          <h2 id="wrist-title" className="display mt-6 text-6xl sm:text-7xl md:text-8xl" data-reveal="mask">
            Off the Track,
            <br />
            <span className="text-silver/40">On the Wrist.</span>
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-silver/70" data-reveal>
            블랙 케이스와 블랙 링크 브레이슬릿은 흰 셔츠 소매 아래에서도, 어두운 톤의 스타일링 위에서도 다이얼의
            휠 디자인을 돋보이게 합니다.
          </p>
          <dl className="mt-12 grid max-w-md grid-cols-2 gap-px bg-white/[0.06]" data-reveal>
            {[
              ["Case", "Black · Round"],
              ["Bracelet", "Black Metal Link"],
              ["Accent", "Racing Green"],
              ["Hands", "Racing Red"],
            ].map(([k, v]) => (
              <div key={k} className="bg-obsidian p-5">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 font-display text-lg uppercase tracking-wide text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* full-bleed night garage */}
      <figure className="relative mt-28 h-[70vh] min-h-[420px] w-full overflow-hidden md:mt-40" data-reveal>
        <Image
          src="/images/watch-garage.jpg"
          alt="어두운 차고, 블랙 스포츠카 옆에 놓인 휠 다이얼 시계"
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent" />
        <figcaption className="container-x absolute inset-x-0 bottom-10">
          <p className="display text-5xl md:text-7xl">After Dark.</p>
          <p className="mt-3 text-xs text-silver/50">연출된 광고 이미지 · 차량은 연출 소품이며 특정 제조사와 무관합니다.</p>
        </figcaption>
      </figure>
    </section>
  );
}
