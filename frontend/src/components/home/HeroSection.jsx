export default function HeroSection() {
  return (
    <section className="wave-bg text-center">
      <div className="px-6 py-24">
        <h1 className="logo-text text-[120px] leading-none md:text-[140px]">
          Coffee Sea
        </h1>

        <p className="mt-4 text-lg uppercase tracking-[6px] md:text-2xl">
          Кофе во Владивостоке
        </p>
      </div>

      <div className="relative overflow-hidden">
        <img
          src="/images/hero-sea.webp"
          alt="Coffee Sea"
          className="h-[420px] w-full object-cover brightness-[0.92]"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}