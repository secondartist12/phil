import Link from "next/link";
import Image from "next/image";

export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden py-36 md:py-52" aria-labelledby="final-title">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
        <Image src="/images/watch-street.jpg" alt="" fill sizes="100vw" className="object-cover object-top blur-[2px]" />
        <div className="absolute inset-0 bg-obsidian/70" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,#08090B_85%)]" />
      </div>
      <div className="container-x text-center">
        <p className="eyebrow" data-reveal>
          06
        </p>
        <h2 id="final-title" className="display mx-auto mt-6 max-w-5xl text-6xl sm:text-8xl md:text-9xl" data-reveal="mask">
          Engineered
          <br />
          to Stand Out<span className="text-racing-green">.</span>
        </h2>
        <div className="mt-14" data-reveal>
          <Link href="/product" className="btn-primary group">
            Discover Your Watch
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
