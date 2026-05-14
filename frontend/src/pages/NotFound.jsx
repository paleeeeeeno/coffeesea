import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 — Coffee Sea"
        description="Страница не найдена. Вернитесь на главную страницу Coffee Sea."
      />

      <section className="wave-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="glass-card glow-hover p-10">
          <h1 className="logo-text text-8xl uppercase md:text-9xl">404</h1>

          <p className="mt-6 text-xl uppercase text-white/80">
            Такой страницы не существует
          </p>

          <Link
            to="/"
            className="mt-8 inline-block border border-white px-8 py-4 uppercase hover:bg-white hover:text-[#1d2946]"
          >
            На главную
          </Link>
        </div>
      </section>
    </>
  );
}