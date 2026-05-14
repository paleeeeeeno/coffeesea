import Seo from "../components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="О нас — Coffee Sea"
        description="История, концепция и атмосфера кофейни Coffee Sea во Владивостоке."
      />

      <section className="wave-bg relative min-h-screen overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#1d2946]/10 to-[#07101f]/70" />
        <div className="absolute left-[-150px] top-[180px] h-[350px] w-[350px] animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[100px] right-[-120px] h-[320px] w-[320px] animate-pulse rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="logo-text fade-up text-center text-7xl uppercase md:text-[120px]">
            О нас
          </h1>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <div className="glass-card glow-hover fade-up p-8">
              <h2 className="text-4xl font-black uppercase">Кофе у моря</h2>

              <p className="mt-6 text-lg uppercase leading-8 text-white/90">
                Coffee Sea — это кофейня во Владивостоке, созданная для тех,
                кто любит море, спокойствие и настоящий кофе. Мы вдохновлялись
                городскими набережными, морским ветром и атмосферой прогулок у воды.
              </p>

              <p className="mt-6 text-lg uppercase leading-8 text-white/75">
                Наша идея — сделать место, где можно не просто выпить кофе, а
                остановиться, выдохнуть и почувствовать Владивосток: его туман,
                волны, чайки и уютные встречи.
              </p>
            </div>

            <img
              src="\public\images\about.webp"
              alt="Море"
              className="h-[400px] w-full rounded-[26px] object-cover object-center shadow-2xl"
            />
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Концепция",
                text: "Морская эстетика, минимализм, тёмно-синяя палитра и спокойная атмосфера. Дизайн построен на ощущении волн, глубины и вечернего Владивостока.",
              },
              {
                title: "Зерно",
                text: "Мы используем зерна средней обжарки, чтобы сохранить баланс: мягкую кислинку, плотное тело и приятное шоколадное послевкусие.",
              },
              {
                title: "Атмосфера",
                text: "Coffee Sea подходит для встреч, учёбы, работы и отдыха. Здесь можно взять кофе с собой или остаться у окна с видом на море.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card glow-hover fade-up p-6">
                <h3 className="text-3xl font-black uppercase">{item.title}</h3>
                <p className="mt-4 uppercase leading-7 text-white/75">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
            <img
              src="\public\images\coffee.webp"
              alt="Кофе"
              className="image-hover h-[430px] w-full object-cover shadow-2xl"
            />

            <div className="glass-card glow-hover fade-up p-8">
              <h2 className="text-4xl font-black uppercase">
                Как мы создаём напитки
              </h2>

              <p className="mt-6 text-lg uppercase leading-8 text-white/85">
                Каждый напиток строится вокруг вкуса зерна. Бариста настраивает
                помол, температуру и время экстракции, чтобы кофе получался
                стабильным, насыщенным и приятным.
              </p>

              <p className="mt-6 text-lg uppercase leading-8 text-white/75">
                В меню есть классика: капучино, латте, флэт уайт, американо, а
                также авторские напитки с сиропами, специями и сезонными вкусами.
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-4">
            {[
              "Отбираем качественное зерно",
              "Настраиваем рецепт напитка",
              "Добавляем десерты и выпечку",
              "Создаём атмосферу у моря",
            ].map((text, index) => (
              <div key={text} className="glow-hover bg-white p-6 text-[#1d2946]">
                <p className="text-5xl font-black">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 uppercase">{text}</p>
              </div>
            ))}
          </div>

          <div className="glass-card glow-hover mt-20 p-8 text-center">
            <h2 className="logo-text text-6xl uppercase md:text-8xl">
              Coffee Sea
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg uppercase leading-8 text-white/80">
              Для нас кофейня — это не только напитки. Это место, где вкус,
              дизайн, город и море соединяются в одно настроение.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}