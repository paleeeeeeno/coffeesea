import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login/", form);

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      navigate("/profile");
    } catch {
      setError("Неверный логин или пароль");
    }
  }

  return (
    <>
      <Seo
        title="Вход — Coffee Sea"
        description="Вход в личный кабинет Coffee Sea."
      />

      <section className="wave-bg relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute left-[-120px] top-20 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-10 right-[-120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />

        <div className="glass-card relative z-10 w-full max-w-[560px] rounded-[30px] border border-white/15 p-10 backdrop-blur-xl">
          <h1 className="logo-text text-center text-6xl uppercase text-white md:text-8xl">
            Вход
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
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
              className="h-[62px] rounded-[18px] border border-white/10 bg-[#08101f]/70 px-6 text-lg text-white outline-none transition focus:border-white/40"
            />

            <button
              type="submit"
              className="mt-3 h-[64px] rounded-[18px] border border-white bg-white text-lg uppercase tracking-[0.15em] text-[#07101f] transition hover:bg-transparent hover:text-white"
            >
              Войти
            </button>
          </form>

          <p className="mt-8 text-center uppercase tracking-[0.12em] text-white/50">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="text-white transition hover:text-cyan-200"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}