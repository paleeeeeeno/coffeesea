export default function HeroSection() {
  return (
    <section className="wave-bg overflow-hidden text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-20 md:px-6 md:py-28">
        <h1 className="hero-title fade-up max-w-full text-center text-white">
          Coffee Sea
        </h1>

        <p className="mt-5 max-w-full text-sm uppercase tracking-[0.35em] text-white/80 sm:text-base md:text-2xl md:tracking-[0.45em]">
          Кофе во Владивостоке
        </p>
      </div>

      <div className="relative overflow-hidden">
        <img
          src="/images/hero-sea.webp"
          alt="Coffee Sea"
          width="1600"
          height="420"
          fetchPriority="high"
          className="h-[300px] w-full object-cover brightness-[0.92] sm:h-[360px] md:h-[420px]"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}