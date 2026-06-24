import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeCookies, setAgreeCookies] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!agreePersonal || !agreeTerms || !agreeCookies) {
      setError("Необходимо принять все условия регистрации");
      return;
    }

    try {
      await api.post("/auth/register/", form);
      navigate("/login");
    } catch {
      setError("Ошибка регистрации");
    }
  }

  const canRegister = agreePersonal && agreeTerms && agreeCookies;

  return (
    <>
      <Seo
        title="Регистрация — Coffee Sea"
        description="Создание аккаунта Coffee Sea."
      />

      <section className="wave-bg relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute left-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="glass-card relative z-10 w-full max-w-[560px] rounded-[30px] border border-white/15 p-10 backdrop-blur-xl">
          <h1 className="logo-text text-center text-4xl uppercase text-white md:text-4xl">
            Регистрация
          </h1>

          <p className="mt-4 text-center uppercase tracking-[0.2em] text-white/50">
            Coffee Sea
          </p>

          {error && (
            <div className="mt-6 border border-red-500/30 bg-red-500/10 p-4 text-center uppercase text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <input
              type="text"
              name="username"
              placeholder="Логин"
              value={form.username}
              onChange={handleChange}
              required
              className="h-[62px] rounded-[18px] border border-white/10 bg-[#08101f]/70 px-6 text-lg text-white outline-none transition focus:border-white/40"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="h-[62px] rounded-[18px] border border-white/10 bg-[#08101f]/70 px-6 text-lg text-white outline-none transition focus:border-white/40"
            />

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
              className="h-[62px] rounded-[18px] border border-white/10 bg-[#08101f]/70 px-6 text-lg text-white outline-none transition focus:border-white/40"
            />

            <label className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-[#08101f]/40 p-4 text-sm text-white/70">
              <input
                type="checkbox"
                checked={agreePersonal}
                onChange={(e) => setAgreePersonal(e.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span>
                Я даю согласие на обработку персональных данных в соответствии с Федеральным законом №152-ФЗ.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-[#08101f]/40 p-4 text-sm text-white/70">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span>
                Я принимаю{" "}
                <a
                  href="/documents/user-agreement.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline"
                >
                  пользовательское соглашение
                </a>
                .
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-[#08101f]/40 p-4 text-sm text-white/70">
              <input
                type="checkbox"
                checked={agreeCookies}
                onChange={(e) => setAgreeCookies(e.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span>
                Я согласен на использование файлов{" "}
                <a
                  href="/documents/cookies-policy.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline"
                >
                  Cookie
                </a>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!canRegister}
              className={`mt-3 h-[64px] rounded-[18px] text-lg uppercase tracking-[0.15em] transition ${
                canRegister
                  ? "border border-white bg-white text-[#07101f] hover:bg-transparent hover:text-white"
                  : "cursor-not-allowed border border-white/10 bg-white/10 text-white/40"
              }`}
            >
              Зарегистрироваться
            </button>
          </form>

          <p className="mt-8 text-center uppercase tracking-[0.12em] text-white/50">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-white transition hover:text-cyan-200">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
