import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="wave-bg overflow-hidden px-5 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="page-title mb-12">
          О нас
        </h2>

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-card rounded-[28px] p-6 md:p-8">
            <p className="text-lg uppercase leading-9 text-white/90 md:text-2xl md:leading-10">
              Кофейня <span className="font-black">Coffee Sea</span> — это
              уютное место на берегу Японского моря, где аромат
              свежесваренного кофе сочетается с панорамными видами на воду.
            </p>

            <p className="mt-7 text-sm uppercase leading-7 text-white/65 md:text-base md:leading-8">
              Мы создаём пространство для тех, кто любит море, неспешные
              встречи, авторские напитки и атмосферу Владивостока.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Кофе у моря"],
                ["02", "Авторские напитки"],
                ["03", "Морская атмосфера"],
              ].map(([num, text]) => (
                <div
                  key={num}
                  className="rounded-[20px] border border-white/20 bg-white/[0.03] p-5"
                >
                  <p className="text-4xl font-black md:text-5xl">
                    {num}
                  </p>

                  <p className="mt-3 text-xs uppercase leading-5 text-white/70 md:text-sm">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-9 inline-block border border-white px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#07101f]"
            >
              Подробнее
            </Link>
          </div>

          <div className="relative">
            <img
              src="/images/about-sea.webp"
              alt="Coffee Sea у моря"
              loading="lazy"
              width="650"
              height="520"
              className="h-[320px] w-full rounded-[28px] object-cover shadow-2xl sm:h-[420px] md:h-[520px]"
            />

            <div className="glass-card absolute bottom-4 left-4 right-4 rounded-[22px] p-5 md:-bottom-8 md:left-8 md:right-auto md:max-w-sm md:p-6">
              <p className="text-sm uppercase leading-6 text-white/75 md:text-base md:leading-7">
                Владивосток, море, кофе и спокойный ритм — основа нашей
                концепции.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
