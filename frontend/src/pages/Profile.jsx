import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Profile() {
  const navigate = useNavigate();

  const [bonus, setBonus] = useState(0);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/bonus/")
      .then((res) => setBonus(res.data.points))
      .catch(() => setError("Не удалось загрузить бонусы."));

    api
      .get("/orders/history/")
      .then((res) => setOrders(res.data))
      .catch(() => setError("Не удалось загрузить историю заказов."));
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  return (
    <>
      <Seo
        title="Профиль — Coffee Sea"
        description="Личный кабинет Coffee Sea
        : бонусы и история заказов."
      />

      <section className="wave-bg min-h-screen px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="logo-text fade-up text-center text-6xl uppercase md:text-8xl">
            Профиль
          </h1>

          {error && (
            <p className="mt-8 bg-red-500/20 p-3 text-center uppercase">
              {error}
            </p>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="glass-card glow-hover p-6">
              <h2 className="text-3xl font-black uppercase">Бонусная система</h2>

              <p className="mt-6 text-5xl font-black">{bonus} бонусов</p>

              <p className="mt-4 uppercase text-white/70">
                За каждый заказ начисляется 5% бонусами.
              </p>
            </div>

            <div className="glass-card glow-hover p-6">
              <h2 className="text-3xl font-black uppercase">Аккаунт</h2>

              <button
                onClick={logout}
                className="mt-8 border border-white px-6 py-3 uppercase hover:bg-white hover:text-[#1d2946]"
              >
                Выйти
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-4xl font-black uppercase">История заказов</h2>

            {orders.length === 0 ? (
              <div className="glass-card mt-6 p-6">
                <p className="uppercase text-white/70">Заказов пока нет.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5">
                {orders.map((order) => (
                  <article key={order.id} className="glass-card glow-hover p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div>
                        <h3 className="text-2xl font-black uppercase">
                          Заказ #{order.id}
                        </h3>

                        <p className="mt-2 uppercase text-white/70">
                          Статус: {order.status}
                        </p>

                        <p className="uppercase text-white/70">
                          Тип:{" "}
                          {order.delivery_type === "delivery"
                            ? "Доставка"
                            : "Самовывоз"}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-3xl font-black">
                          {order.total_price}₽
                        </p>

                        <p className="uppercase text-white/70">
                          +{order.bonus_earned} бонусов
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
