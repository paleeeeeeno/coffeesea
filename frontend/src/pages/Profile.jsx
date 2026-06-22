import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Seo from "../components/Seo";
import { api } from "../api/client";

function normalizeOrders(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

async function fetchBonus() {
  const res = await api.get("/bonus/");
  return res.data?.points || 0;
}

async function fetchOrders() {
  const res = await api.get("/orders/history/");
  return normalizeOrders(res.data);
}

export default function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: bonus = 0,
    isError: bonusError,
  } = useQuery({
    queryKey: ["profile-bonus"],
    queryFn: fetchBonus,
    retry: 1,
  });

  const {
    data: orders = [],
    isError: ordersError,
  } = useQuery({
    queryKey: ["profile-orders"],
    queryFn: fetchOrders,
    retry: 1,
  });

  const error =
    bonusError || ordersError
      ? "Войдите в аккаунт, чтобы увидеть бонусы и историю заказов."
      : "";

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    queryClient.removeQueries({ queryKey: ["profile-bonus"] });
    queryClient.removeQueries({ queryKey: ["profile-orders"] });

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
                {orders.map((order, index) => (
                  <article
                    key={order.id}
                    className="glass-card glow-hover rounded-[28px] p-6"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row">
                      <div>
                        <div key={order.id}>
                          <h3>Заказ №{index + 1}</h3>
                        </div>

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