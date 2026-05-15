import Seo from "../components/Seo";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import PopularSection from "../components/home/PopularSection";

export default function Home() {
  return (
    <>
      <Seo
        title="Coffee Sea — кофе во Владивостоке"
        description="Coffee Sea — кофейня во Владивостоке рядом с морем, авторский кофе, десерты и доставка."
      />

      <main className="overflow-x-hidden bg-[#1d2946] text-[#f8f8f3]">
        <HeroSection />
        <AboutSection />
        <PopularSection />
      </main>
    </>
  );
}