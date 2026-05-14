import { useState } from "react";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/feedback/", form);

      alert("Сообщение отправлено");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      const data = err.response?.data;

      if (data?.email) setError("Введите корректный email.");
      else if (data?.name) setError("Введите имя.");
      else if (data?.message) setError("Введите сообщение.");
      else setError("Ошибка отправки сообщения.");
    }
  }

  return (
    <>
      <Seo
        title="Контакты — Coffee Sea"
        description="Свяжитесь с Coffee Sea: обратная связь, телефон и почта."
      />

      <section className="wave-bg min-h-screen px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="logo-text fade-up text-center text-6xl uppercase md:text-8xl">
            Контакты
          </h1>

          <form onSubmit={handleSubmit} className="glass-card glow-hover mt-12 grid gap-5 p-8">
            {error && (
              <p className="bg-red-500/20 p-3 text-center uppercase">
                {error}
              </p>
            )}

            <input
              name="name"
              placeholder="Имя"
              value={form.name}
              onChange={handleChange}
              className="border border-white/20 bg-transparent px-4 py-3 outline-none"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-white/20 bg-transparent px-4 py-3 outline-none"
              required
            />

            <input
              name="phone"
              placeholder="Телефон"
              value={form.phone}
              onChange={handleChange}
              className="border border-white/20 bg-transparent px-4 py-3 outline-none"
            />

            <textarea
              name="message"
              placeholder="Сообщение"
              value={form.message}
              onChange={handleChange}
              className="min-h-40 border border-white/20 bg-transparent px-4 py-3 outline-none"
              required
            />

            <button className="border border-white px-6 py-3 uppercase hover:bg-white hover:text-[#1d2946]">
              Отправить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}