import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");

    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] w-[95%] max-w-3xl -translate-x-1/2 rounded-3xl border border-white/20 bg-[#07101f]/95 p-5 text-white shadow-2xl backdrop-blur-xl">
      <p className="text-sm leading-6 text-white/80">
        Мы используем файлы Cookie для улучшения работы сайта. Продолжая
        использовать сайт, вы соглашаетесь с нашей{" "}
        <a
          href="/documents/cookies-policy.pdf"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Политикой Cookie
        </a>
        .
      </p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={acceptCookies}
          className="rounded-xl border border-white bg-white px-5 py-2 text-sm font-semibold uppercase text-[#07101f] transition hover:bg-transparent hover:text-white"
        >
          Принять
        </button>
      </div>
    </div>
  );
}