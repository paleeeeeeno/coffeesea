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
      .then((res) => setBonus(res.data.points || 0))
      .catch(() => setError("Войдите в аккаунт, чтобы увидеть бонусы."));

    api
      .get("/orders/history/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.results)
            ? res.data.results
            : [];

        setOrders(data);
      })
      .catch(() => setError("Войдите в аккаунт, чтобы увидеть историю заказов."));
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
        description="Личный кабинет Coffee Sea: бонусы и история заказов."
      />

      <section className="wave-bg page-section">
        <div className="page-container">
          <h1 className="page-title profile-title fade-up">Профиль</h1>

          {error && (
            <p className="glass-card mx-auto mt-8 max-w-2xl rounded-[20px] p-4 text-center text-sm uppercase leading-6 text-white/75">
              {error}
            </p>
          )}

          <div className="profile-grid mt-12 grid gap-6 md:grid-cols-2">
            <div className="glass-card glow-hover rounded-[28px] p-6 md:p-8">
              <h2 className="section-title text-2xl text-white md:text-3xl">
                Бонусная система
              </h2>

              <p className="mt-6 text-4xl font-black text-white md:text-5xl">
                {bonus} бонусов
              </p>

              <p className="mt-4 text-sm uppercase leading-6 text-white/70 md:text-base">
                За каждый заказ начисляется 5% бонусами.
              </p>
            </div>

            <div className="glass-card glow-hover rounded-[28px] p-6 md:p-8">
              <h2 className="section-title text-2xl text-white md:text-3xl">
                Аккаунт
              </h2>

              <button
                type="button"
                onClick={logout}
                className="mt-8 w-full rounded-2xl border border-white/30 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition hover:border-white hover:bg-white hover:text-[#1d2946] sm:w-auto"
              >
                Выйти
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="section-title text-3xl text-white md:text-4xl">
              История заказов
            </h2>

            {orders.length === 0 ? (
              <div className="glass-card mt-6 rounded-[28px] p-6">
                <p className="text-sm uppercase leading-6 text-white/70 md:text-base">
                  Заказов пока нет.
                </p>
              </div>
            ) : (
              <div className="orders-grid mt-6 grid gap-5">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="glass-card glow-hover rounded-[28px] p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                      <div>
                        <h3 className="text-2xl font-black uppercase text-white">
                          Заказ #{order.id}
                        </h3>

                        <p className="mt-2 text-sm uppercase leading-6 text-white/70 md:text-base">
                          Статус: {order.status || "В обработке"}
                        </p>

                        <p className="text-sm uppercase leading-6 text-white/70 md:text-base">
                          Тип:{" "}
                          {order.delivery_type === "delivery"
                            ? "Доставка"
                            : "Самовывоз"}
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <p className="text-3xl font-black text-white">
                          {order.total_price}₽
                        </p>

                        <p className="text-sm uppercase leading-6 text-white/70 md:text-base">
                          +{order.bonus_earned || 0} бонусов
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