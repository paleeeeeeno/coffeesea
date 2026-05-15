import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/20 bg-[#07101f] px-5 py-10 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-base font-black uppercase tracking-widest md:text-lg">
            Контакты
          </h3>

          <p className="break-words text-sm leading-6 text-white/80 md:text-base">
            Телефон: +7 (900) 416-14-83
          </p>

          <p className="break-words text-sm leading-6 text-white/80 md:text-base">
            Почта: coffeesea@mail.ru
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-base font-black uppercase tracking-widest md:text-lg">
            Навигация
          </h3>

          <div className="flex flex-col gap-2 text-sm text-white/80 md:text-base">
            <Link to="/">Главная</Link>
            <Link to="/about">О нас</Link>
            <Link to="/menu">Меню</Link>
            <Link to="/cafes">Кофейни</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/cart">Корзина</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-black uppercase tracking-widest md:text-lg">
            Соцсети
          </h3>

          <div className="flex flex-col gap-2 text-sm text-white/80 md:text-base">
            <a href="#">Instagram</a>
            <a href="#">Telegram</a>
            <a href="#">VK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}