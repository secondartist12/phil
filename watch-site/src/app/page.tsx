import { Hero } from "@/components/home/Hero";
import { DesignDNA } from "@/components/home/DesignDNA";
import { Details } from "@/components/home/Details";
import { OnTheWrist } from "@/components/home/OnTheWrist";
import { Showcase } from "@/components/home/Showcase";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DesignDNA />
      <Details />
      <OnTheWrist />
      <Showcase />
      <FinalCta />
    </>
  );
}
