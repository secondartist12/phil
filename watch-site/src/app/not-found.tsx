import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-24">
      <p className="eyebrow">404</p>
      <h1 className="display mt-6 text-7xl md:text-9xl">Off Track.</h1>
      <p className="mt-6 text-silver/70">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="btn-primary mt-10">
        Back to Home
      </Link>
    </section>
  );
}
