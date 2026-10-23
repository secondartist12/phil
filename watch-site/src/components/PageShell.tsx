import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
  narrow = true,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className="pb-28 pt-32 md:pt-44">
      <div className="container-x">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-6 text-6xl sm:text-7xl md:text-8xl">{title}</h1>
        {intro && <div className="mt-8 max-w-2xl leading-relaxed text-silver/70">{intro}</div>}
        <div className="hairline my-14" />
        <div className={narrow ? "max-w-3xl" : ""}>{children}</div>
      </div>
    </div>
  );
}

/** Prose block for legal / policy pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-10 text-[15px] leading-[1.85] text-silver/80 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-white [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white [&_ul]:space-y-1.5">
      {children}
    </div>
  );
}

export function Pending({ children = "확정 후 안내" }: { children?: ReactNode }) {
  return <span className="pending">{children}</span>;
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-white/[0.08]">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-white/[0.08]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-base text-white transition-colors hover:text-racing-green md:text-lg [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span aria-hidden="true" className="mt-1 text-xl leading-none transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-6 pr-10 text-sm leading-relaxed text-silver/70 md:text-[15px]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
