import { Send, Mail, Paperclip, Camera } from "lucide-react";

export default function Contacts() {
  return (
    <section className="wave-bg page-section flex items-center justify-center">
      <div className="page-container flex flex-col items-center gap-10">
        <h1 className="page-title contacts-title fade-up">
          Обратная связь
        </h1>

        <div className="glass-card w-full max-w-4xl rounded-[28px] p-5 md:p-10">
          <p className="mb-8 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Мы рады вашим сообщениям! Напишите нам, и мы постараемся ответить
            как можно скорее.
          </p>

          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Имя"
              className="form-field rounded-xl px-5 py-4"
            />

            <input
              type="email"
              placeholder="Email"
              className="form-field rounded-xl px-5 py-4"
            />

            <input
              type="tel"
              placeholder="Телефон"
              className="form-field rounded-xl px-5 py-4"
            />

            <textarea
              placeholder="Сообщение"
              rows={6}
              className="form-field resize-none rounded-xl px-5 py-4"
            />

            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <label className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-white/30 px-5 py-4 text-white/70 transition hover:border-white/60 hover:text-white md:w-auto">
                <Paperclip size={20} />
                <span>Прикрепить файл</span>
                <input type="file" className="hidden" />
              </label>

              <p className="text-sm leading-6 text-white/50">
                Вы можете прикрепить файл до 5 МБ.
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl border border-white/30 bg-transparent px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white hover:bg-white hover:text-[#07101f]"
            >
              <Send size={18} />
              Отправить сообщение
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6 text-white/80">
          <a href="#" className="transition hover:scale-110 hover:text-white">
            <Camera size={24} />
          </a>

          <a href="#" className="transition hover:scale-110 hover:text-white">
            <Send size={24} />
          </a>

          <a href="#" className="transition hover:scale-110 hover:text-white">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}