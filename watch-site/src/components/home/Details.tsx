import Image from "next/image";

const DETAILS = [
  {
    n: "01",
    title: "Spoke Geometry",
    ko: "스포크 지오메트리",
    body: "여러 갈래로 나뉘며 교차하는 실버 스포크. 다이얼의 깊이감을 만드는 핵심 구조입니다.",
    src: "/images/detail-spokes.jpg",
    w: 310,
    h: 310,
  },
  {
    n: "02",
    title: "Hub & Red Hands",
    ko: "허브 & 레드 핸즈",
    body: "실버 볼트 형상의 허브 위로 레드 핸즈가 지나갑니다.",
    src: "/images/detail-hub.jpg",
    w: 280,
    h: 280,
  },
  {
    n: "03",
    title: "Caliper Accent",
    ko: "캘리퍼 포인트",
    body: "스포크 사이로 드러나는 형광 그린 캘리퍼 형상의 포인트.",
    src: "/images/detail-caliper.jpg",
    w: 260,
    h: 300,
  },
  {
    n: "04",
    title: "Link Bracelet",
    ko: "링크 브레이슬릿",
    body: "블랙 원형 케이스에서 이어지는 블랙 메탈 링크 브레이슬릿.",
    src: "/images/detail-bracelet.jpg",
    w: 330,
    h: 330,
  },
];

export function Details() {
  return (
    <section id="details" className="relative scroll-mt-20 bg-[#0B0C0F] py-28 md:py-40" aria-labelledby="details-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow" data-reveal>
              03 — Details Matter
            </p>
            <h2 id="details-title" className="display mt-6 text-6xl sm:text-7xl md:text-8xl" data-reveal="mask">
              Every Line
              <br />
              Has a Purpose.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-silver/60" data-reveal>
            제공된 제품 이미지에서 확인되는 디테일만 클로즈업했습니다. 소재와 마감 사양은 확정 후 공개됩니다.
          </p>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d, i) => (
            <figure
              key={d.n}
              className={`group ${i % 2 ? "sm:mt-12" : ""}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                <Image
                  src={d.src}
                  alt={`${d.ko} 클로즈업`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 font-display text-sm tabular-nums text-white/70">{d.n}</span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-racing-green transition-all duration-700 group-hover:w-full" />
              </div>
              <figcaption className="mt-5">
                <p className="font-display text-2xl font-semibold uppercase tracking-wide text-white">{d.title}</p>
                <p className="mt-1 text-xs text-silver/50">{d.ko}</p>
                <p className="mt-3 text-sm leading-relaxed text-silver/70">{d.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
