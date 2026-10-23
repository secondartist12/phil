"use client";

import Image from "next/image";
import { useState } from "react";

const POINTS = [
  {
    key: "spokes",
    wheel: "Spokes",
    dial: "멀티 스포크 다이얼",
    body: "휠 스포크처럼 갈라지는 실버 라인이 다이얼 전체를 구성합니다.",
    x: 30.8,
    y: 14.3,
  },
  {
    key: "silver",
    wheel: "Hub & Bolts",
    dial: "실버 메탈 디테일",
    body: "중앙 허브를 둘러싼 실버 볼트 형상의 디테일.",
    x: 59,
    y: 24.6,
  },
  {
    key: "hands",
    wheel: "Redline",
    dial: "레드 핸즈",
    body: "블랙과 실버 사이를 가르는 레드 컬러 시곗바늘.",
    x: 37,
    y: 32.8,
  },
  {
    key: "caliper",
    wheel: "Brake Caliper",
    dial: "그린 캘리퍼 스타일 포인트",
    body: "스포크 너머로 보이는 형광 그린 캘리퍼 형상.",
    x: 72,
    y: 29.7,
  },
] as const;

export function DesignDNA() {
  const [active, setActive] = useState<string>(POINTS[0].key);

  return (
    <section id="design" className="relative scroll-mt-20 overflow-hidden py-28 md:py-40" aria-labelledby="dna-title">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div>
          <p className="eyebrow" data-reveal>
            02 — Design DNA
          </p>
          <h2 id="dna-title" className="display mt-6 text-6xl sm:text-7xl md:text-8xl" data-reveal="mask">
            The Wheel,
            <br />
            <span className="text-silver/40">Rethought</span>
            <br />
            as Time.
          </h2>
          <p className="mt-8 max-w-md leading-relaxed text-silver/70" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
            스포츠 휠의 구조를 그대로 다이얼 위로 옮겼습니다. 휠을 이루는 요소가 시계의 어디에 자리하는지
            살펴보세요.
          </p>

          <ol className="mt-12 border-t border-white/[0.08]">
            {POINTS.map((p, i) => {
              const on = active === p.key;
              return (
                <li key={p.key} className="border-b border-white/[0.08]" data-reveal style={{ ["--reveal-delay" as string]: `${200 + i * 80}ms` }}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(p.key)}
                    onFocus={() => setActive(p.key)}
                    onClick={() => setActive(p.key)}
                    aria-pressed={on}
                    className="grid w-full grid-cols-[3rem_1fr] items-baseline gap-2 py-5 text-left md:grid-cols-[3rem_10rem_1fr]"
                  >
                    <span className={`font-display text-sm tabular-nums transition-colors ${on ? "text-racing-green" : "text-silver/40"}`}>
                      0{i + 1}
                    </span>
                    <span className={`font-display text-xl font-semibold uppercase tracking-wider transition-colors ${on ? "text-white" : "text-silver/50"}`}>
                      {p.wheel}
                    </span>
                    <span className="col-start-2 md:col-start-3">
                      <span className={`block text-sm transition-colors ${on ? "text-white" : "text-silver/60"}`}>→ {p.dial}</span>
                      <span
                        className={`grid text-sm text-silver/60 transition-[grid-template-rows,opacity] duration-500 ${
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2">{p.body}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative" data-reveal>
          <div className="relative mx-auto aspect-[650/976] w-full max-w-[560px] overflow-hidden">
            <Image
              src="/images/watch-street.jpg"
              alt="휠 다이얼 시계의 다이얼 클로즈업"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/30" />
            {POINTS.map((p, i) => {
              const on = active === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onMouseEnter={() => setActive(p.key)}
                  onClick={() => setActive(p.key)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-3"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={`${p.dial} 위치 표시`}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span
                      className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                        on ? "scale-[2.2] border-racing-green opacity-100" : "scale-100 border-white/60 opacity-70"
                      }`}
                    />
                    <span className={`h-1.5 w-1.5 rounded-full transition-colors ${on ? "bg-racing-green" : "bg-white"}`} />
                    <span className="sr-only">{i + 1}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mx-auto mt-4 max-w-[560px] text-[11px] text-silver/40">연출된 광고 이미지</p>
        </div>
      </div>
    </section>
  );
}
