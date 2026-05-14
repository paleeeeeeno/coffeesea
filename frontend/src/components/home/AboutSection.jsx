import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="wave-bg px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="logo-text mb-14 text-center text-5xl uppercase text-white md:text-[100px]">
          О нас
        </h2>

        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-white/20 bg-[#07101f]/85 p-8 backdrop-blur-sm">
            <p className="text-2xl uppercase leading-10 text-white/90">
              Кофейня <span className="font-black">Coffee Sea</span> — это
              уютное место на берегу Японского моря, где аромат
              свежесваренного кофе сочетается с панорамными видами на воду.
            </p>

            <p className="mt-7 text-base uppercase leading-8 text-white/65">
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
                  className="border border-white/20 bg-white/[0.03] p-5"
                >
                  <p className="text-5xl font-black">{num}</p>
                  <p className="mt-3 text-sm uppercase leading-5 text-white/70">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-9 inline-block border border-white px-8 py-3 uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#07101f]"
            >
              Подробнее
            </Link>
          </div>

          <div className="relative">
            <img
              src="/images/about-sea.webp"
              alt="Coffee Sea у моря"
              className="h-[520px] w-full rounded-[28px] object-cover shadow-2xl"
            />

            <div className="absolute -bottom-8 left-8 max-w-sm rounded-[24px] border border-white/20 bg-[#07101f]/90 p-6 backdrop-blur-sm">
              <p className="uppercase leading-7 text-white/75">
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