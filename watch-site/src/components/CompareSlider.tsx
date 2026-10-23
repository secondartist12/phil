"use client";

import Image from "next/image";
import { useState } from "react";

type Side = { src: string; alt: string; label: string };

/** Drag / keyboard comparison of two real images (no synthesized "before"). */
export function CompareSlider({ left, right }: { left: Side; right: Side }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-square w-full select-none overflow-hidden bg-carbon md:aspect-[16/10]">
      <Image src={right.src} alt={right.alt} fill sizes="(min-width:768px) 70vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={left.src} alt={left.alt} fill sizes="(min-width:768px) 70vw, 100vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-obsidian/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur">
        {left.label}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-obsidian/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur">
        {right.label}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-racing-green" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-racing-green bg-obsidian/80 text-xs text-racing-green">
          ⟷
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${left.label}와 ${right.label} 비교 슬라이더`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
