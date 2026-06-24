import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, X } from "lucide-react";

const navLinks = [
  { to: "/menu", label: "Меню" },
  { to: "/about", label: "О нас" },
  { to: "/cafes", label: "Кофейни" },
  { to: "/contacts", label: "Связь с нами" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = cart.reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0
    );

    setCartCount(total);
  };

  updateCartCount();

  window.addEventListener("cart-updated", updateCartCount);

  return () => {
    window.removeEventListener("cart-updated", updateCartCount);
  };
}, []);


  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link
            to="/"
            onClick={closeMenu}
            className="site-header__logo"
            aria-label="Coffee Sea — на главную"
          >
            <img
              src="/images/logo.webp"
              alt="Coffee Sea"
              className="site-header__logo-img"
            />
          </Link>

          <nav className="site-header__nav" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="site-header__nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link
              to="/cart"
              onClick={closeMenu}
              className="site-header__icon-link"
              aria-label="Корзина"
            >
              <ShoppingCart className="site-header__icon" strokeWidth={2.2} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-white bg-[#f8f8f3] px-1 text-[11px] font-black text-[#07101f] shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              onClick={closeMenu}
              className="site-header__icon-link"
              aria-label="Профиль"
            >
              <User className="site-header__icon" strokeWidth={2.2} />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="site-header__burger"
              aria-label="Открыть меню"
            >
              <Menu className="site-header__icon" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <button
          type="button"
          onClick={closeMenu}
          className="fixed inset-0 z-[999998] bg-black/70 backdrop-blur-sm md:hidden"
          aria-label="Закрыть меню"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[999999] h-[100dvh] w-[min(320px,86vw)] border-l border-white/10 bg-[#07101f] p-7 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeMenu}
            className="flex h-11 w-11 items-center justify-center"
            aria-label="Закрыть меню"
          >
            <X className="site-header__icon" strokeWidth={2.2} />
          </button>
        </div>

        <nav className="mt-14 flex flex-col gap-7 text-xl uppercase tracking-[0.2em]">
          {[...navLinks, { to: "/profile", label: "Профиль" }, { to: "/cart", label: "Корзина" }].map(
            (link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="transition hover:text-white/70"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}