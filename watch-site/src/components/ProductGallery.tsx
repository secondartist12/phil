"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/config/product";

export function ProductGallery({ images, priority = false }: { images: ProductImage[]; priority?: boolean }) {
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length],
  );
  const current = images[index];

  return (
    <div className="flex flex-col gap-4">
      <div
        className="group relative aspect-[4/5] w-full overflow-hidden bg-carbon/40"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="제품 이미지 갤러리"
        tabIndex={0}
      >
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={priority && i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
              i === index ? "scale-100 opacity-100" : "pointer-events-none scale-[1.03] opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="absolute right-4 top-4 flex h-11 items-center gap-2 bg-obsidian/60 px-4 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur transition-colors hover:bg-obsidian"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5M11 8v6M8 11h6" />
          </svg>
          확대
        </button>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <span className="text-[11px] tabular-nums tracking-[0.2em] text-white/80">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} className="h-11 w-11 border border-white/20 bg-obsidian/40 text-white backdrop-blur hover:border-white" aria-label="이전 이미지">
              ←
            </button>
            <button type="button" onClick={() => go(1)} className="h-11 w-11 border border-white/20 bg-obsidian/40 text-white backdrop-blur hover:border-white" aria-label="다음 이미지">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative h-20 w-16 shrink-0 overflow-hidden transition-[opacity,outline-color] sm:h-24 sm:w-20 ${
              i === index ? "opacity-100 outline outline-1 outline-racing-green" : "opacity-50 hover:opacity-90"
            }`}
            aria-label={`이미지 ${i + 1} 보기`}
            aria-current={i === index}
          >
            <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-silver/50">
        {current.kind === "campaign" ? "연출된 광고 이미지" : "착용 이미지"} · 일부 이미지는 연출 컷으로 실제 색감·질감과 다를 수 있습니다.
      </p>

      {zoomOpen && <Lightbox images={images} index={index} setIndex={setIndex} onClose={() => setZoomOpen(false)} />}
    </div>
  );
}

function Lightbox({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: ProductImage[];
  index: number;
  setIndex: (fn: (i: number) => number) => void;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [images.length, onClose, setIndex]);

  useEffect(() => setZoomed(false), [index]);

  const track = (clientX: number, clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOrigin(`${((clientX - r.left) / r.width) * 100}% ${((clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="이미지 확대 보기" className="fixed inset-0 z-[70] flex flex-col bg-obsidian/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-5">
        <span className="text-xs text-silver/60">{zoomed ? "움직여서 살펴보기 · 클릭하여 축소" : "클릭하여 확대"}</span>
        <button ref={closeRef} type="button" onClick={onClose} className="h-11 w-11 text-3xl text-white" aria-label="닫기">
          ×
        </button>
      </div>
      <div
        className={`relative flex-1 overflow-hidden ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={(e) => {
          track(e.clientX, e.clientY, e.currentTarget);
          setZoomed((z) => !z);
        }}
        onMouseMove={(e) => zoomed && track(e.clientX, e.clientY, e.currentTarget)}
        onTouchMove={(e) => zoomed && track(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget)}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="100vw"
          quality={90}
          className="object-contain transition-transform duration-300 ease-out"
          style={{ transform: zoomed ? "scale(2.2)" : "scale(1)", transformOrigin: origin }}
        />
      </div>
      <div className="flex justify-center gap-3 p-5">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setIndex(() => i)}
            className={`h-1 w-10 transition-colors ${i === index ? "bg-racing-green" : "bg-white/20 hover:bg-white/50"}`}
            aria-label={`이미지 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
