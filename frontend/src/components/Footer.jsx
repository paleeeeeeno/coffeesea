import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/20 bg-[#07101f] px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-black uppercase tracking-widest">
            Контакты
          </h3>

          <p className="text-white/80">Телефон: +7 (900) 416-14-83</p>
          <p className="text-white/80">Почта: coffeesea@mail.ru</p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black uppercase tracking-widest">
            Навигация
          </h3>

          <div className="flex flex-col gap-2 text-white/80">
            <Link to="/">Главная</Link>
            <Link to="/about">О нас</Link>
            <Link to="/menu">Меню</Link>
            <Link to="/cafes">Кофейни</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/cart">Корзина</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-black uppercase tracking-widest">
            Соцсети
          </h3>

          <div className="flex flex-col gap-2 text-white/80">
            <a href="#">Instagram</a>
            <a href="#">Telegram</a>
            <a href="#">VK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}