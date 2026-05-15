import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { getProductImage } from "../utils/getProductImage";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

const CartItem = memo(function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const price = Number(item.price || 0);
  const quantity = Number(item.quantity || 1);

  return (
    <article className="glass-card responsive-card grid gap-5 rounded-[28px] p-5 sm:grid-cols-[130px_1fr_auto] sm:items-center">
      <img
        src={getProductImage(item)}
        alt={item.name}
        className="h-[150px] w-full rounded-[22px] object-cover sm:h-[130px] sm:w-[130px]"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.src = "/images/products/placeholder.jpg";
        }}
      />

      <div className="min-w-0">
        <h3 className="text-2xl font-semibold text-white">{item.name}</h3>

        {item.size?.name && (
          <p className="mt-2 text-sm text-white/60">Размер: {item.size.name}</p>
        )}

        {item.modifiers?.length > 0 && (
          <p className="mt-1 text-sm leading-6 text-white/60">
            Добавки: {item.modifiers.map((modifier) => modifier.name).join(", ")}
          </p>
        )}

        <p className="mt-3 text-lg font-semibold text-white">
          {price.toLocaleString("ru-RU")} ₽
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:border-white"
            aria-label="Уменьшить количество"
          >
            <Minus size={18} />
          </button>

          <span className="min-w-8 text-center text-lg font-semibold">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:border-white"
            aria-label="Увеличить количество"
          >
            <Plus size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/75 transition hover:border-white hover:text-white"
          aria-label="Удалить товар"
        >
          <Trash2 size={19} />
        </button>
      </div>
    </article>
  );
});

export default function Cart() {
  const [cart, setCart] = useState(() => readCart());

  useEffect(() => {
    const syncCart = () => setCart(readCart());

    window.addEventListener("storage", syncCart);
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  const updateCart = useCallback((updater) => {
    setCart((current) => {
      const nextCart = updater(current);
      saveCart(nextCart);
      return nextCart;
    });
  }, []);

  const increase = useCallback(
    (id) => {
      updateCart((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, quantity: Number(item.quantity || 1) + 1 }
            : item
        )
      );
    },
    [updateCart]
  );

  const decrease = useCallback(
    (id) => {
      updateCart((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, Number(item.quantity || 1) - 1) }
            : item
        )
      );
    },
    [updateCart]
  );

  const remove = useCallback(
    (id) => {
      updateCart((current) => current.filter((item) => item.id !== id));
    },
    [updateCart]
  );

  const clearCart = useCallback(() => {
    updateCart(() => []);
  }, [updateCart]);

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <section className="wave-bg page-section flex items-center justify-center">
        <div className="page-container text-center">
          <h1 className="page-title cart-title fade-up">Корзина</h1>

          <div className="glass-card mx-auto mt-10 max-w-xl rounded-[28px] p-6 md:p-8">
            <p className="text-base text-white/70 md:text-lg">
              Ваша корзина пока пуста.
            </p>

            <Link
              to="/menu"
              className="mt-6 inline-flex rounded-full border border-white/30 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white hover:text-[#07101f]"
            >
              Перейти в меню
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wave-bg page-section">
      <div className="page-container">
        <h1 className="page-title cart-title fade-up">Корзина</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-5">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))}
          </div>

          <aside className="glass-card h-fit rounded-[28px] p-6 lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Итого</h2>

            <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-5">
              <span className="text-white/65">Сумма заказа</span>
              <span className="text-2xl font-bold">
                {total.toLocaleString("ru-RU")} ₽
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-5 flex w-full items-center justify-center rounded-2xl border border-white/25 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white"
            >
              Оформить
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-white/25 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition hover:border-white"
            >
              Очистить корзину
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}