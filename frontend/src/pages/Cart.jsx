import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function increase(id) {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(id) {
    updateCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  function removeItem(id) {
    updateCart(cart.filter((item) => item.id !== id));
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Seo title="Корзина — Coffee Sea" description="Корзина заказа Coffee Sea." />

      <section className="wave-bg min-h-screen px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="page-title cart-title">
            Корзина
          </h1>
          {cart.length === 0 ? (
            <div className="glass-card glow-hover mx-auto mt-12 max-w-xl p-8 text-center">
              <p className="text-xl uppercase text-white/70">
                Корзина пока пустая
              </p>

              <Link
                to="/menu"
                className="mt-8 inline-block border border-white px-6 py-3 uppercase hover:bg-white hover:text-[#1d2946]"
              >
                Перейти в меню
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-14 grid gap-6">
                {cart.map((item) => {
                  const imageUrl = item.image
                    ? `http://127.0.0.1:8000${item.image}`
                    : "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";

                  return (
                    <article
                      key={item.id}
                      className="glass-card glow-hover grid gap-5 p-4 md:grid-cols-[180px_1fr_auto]"
                    >
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="image-hover h-40 w-full object-cover"
                      />

                      <div>
                        <h2 className="text-2xl font-black uppercase">{item.name}</h2>

                        {item.size && (
                          <p className="mt-2 uppercase text-white/70">
                            Размер: {item.size.name}
                          </p>
                        )}

                        {item.modifiers?.length > 0 && (
                          <p className="mt-2 uppercase text-white/70">
                            Добавки: {item.modifiers.map((mod) => mod.name).join(", ")}
                          </p>
                        )}

                        <p className="mt-4 text-xl font-black">{item.price}₽</p>
                      </div>

                      <div className="flex items-center gap-4 md:flex-col md:items-end md:justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={() => decrease(item.id)} className="flex h-9 w-9 items-center justify-center border border-white">
                            -
                          </button>

                          <span className="text-xl font-black">{item.quantity}</span>

                          <button onClick={() => increase(item.id)} className="flex h-9 w-9 items-center justify-center border border-white">
                            +
                          </button>
                        </div>

                        <button onClick={() => removeItem(item.id)} className="text-sm uppercase text-white/60 hover:text-white">
                          Удалить
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="glass-card glow-hover mt-10 flex flex-col items-end gap-5 p-6">
                <p className="text-3xl font-black uppercase">Итого: {total}₽</p>

                <Link
                  to="/checkout"
                  className="border border-white px-8 py-4 uppercase hover:bg-white hover:text-[#1d2946]"
                >
                  Оформить заказ
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}