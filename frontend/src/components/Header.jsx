import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/20 bg-[#07101f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="logo-text text-4xl">
        <img
          src="/images/logo.webp"
          alt="Coffee Sea"
          className="h-10 w-auto scale-200 object-contain"
        />
        </Link>

        <nav className="hidden items-center gap-10 uppercase tracking-[6px] md:flex">

          <Link className="hover:text-white/70" to="/menu">Меню</Link>
          <Link className="hover:text-white/70" to="/about">О нас</Link>
          <Link className="hover:text-white/70" to="/cafes">Кофейни</Link>
          <Link className="hover:text-white/70" to="/contacts">Контакты</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:text-white/70">
            <ShoppingCart size={22} />
          </Link>

          <Link to="/profile" className="hover:text-white/70">
            <User size={22} />
          </Link>

          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <Menu size={30} />
          </button>
        </div>
      </div>

      <div
        className={`
          fixed right-0 top-0 z-[100]
          h-screen w-[280px]
          border-l border-white/10
          bg-[#07101f]
          p-8
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-end">
          <button onClick={closeMenu}>
            <X size={32} />
          </button>
        </div>

        <nav className="mt-16 flex flex-col gap-8 text-xl uppercase tracking-[4px]">
          <Link onClick={closeMenu} to="/menu">Меню</Link>
          <Link onClick={closeMenu} to="/about">О нас</Link>
          <Link onClick={closeMenu} to="/cafes">Кофейни</Link>
          <Link onClick={closeMenu} to="/contacts">Контакты</Link>
          <Link onClick={closeMenu} to="/profile">Профиль</Link>
        </nav>
      </div>

      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/60 md:hidden"
        />
      )}
    </header>
  );
}