import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [paymentType, setPaymentType] = useState("online");
  const [address, setAddress] = useState("");
  const [cafeAddress, setCafeAddress] = useState("Coffee See, ул. Морская, 10");
  const [error, setError] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  async function createOrder(event) {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Корзина пустая.");
      return;
    }

    if (deliveryType === "delivery" && !address.trim()) {
      setError("Введите адрес доставки.");
      return;
    }

    try {
      await api.post("/orders/", {
        payment_type: paymentType,
        delivery_type: deliveryType,
        address: deliveryType === "delivery" ? address : "",
        cafe_address: deliveryType === "pickup" ? cafeAddress : "",
        total_price: total,
      });

      localStorage.removeItem("cart");
      navigate("/profile");
    } catch (err) {
      console.log("ОШИБКА ЗАКАЗА:", err.response?.data || err);
      setError("Ошибка оформления заказа. Проверьте вход в аккаунт.");
    }
  }

  return (
    <>
      <Seo
        title="Оформление — Coffee Sea"
        description="Оформление заказа Coffee Sea: самовывоз или доставка."
      />

      <section className="wave-bg min-h-screen px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="page-title fade-up">
            Оформление
          </h1>

          <form onSubmit={createOrder} className="glass-card glow-hover mt-12 p-6">
            {error && (
              <p className="mb-6 bg-red-500/20 p-3 text-center uppercase">
                {error}
              </p>
            )}

            <h2 className="text-3xl font-black uppercase">Способ получения</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryType("pickup")}
                className={`border px-6 py-4 uppercase ${
                  deliveryType === "pickup" ? "bg-white text-[#1d2946]" : "border-white"
                }`}
              >
                Самовывоз
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType("delivery")}
                className={`border px-6 py-4 uppercase ${
                  deliveryType === "delivery" ? "bg-white text-[#1d2946]" : "border-white"
                }`}
              >
                Доставка
              </button>
            </div>

            <h2 className="mt-8 text-3xl font-black uppercase">
            Способ оплаты
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <button
              type="button"
              onClick={() => setPaymentType("online")}
              className={`border px-6 py-4 uppercase ${
                paymentType === "online"
                  ? "bg-white text-[#1d2946]"
                  : "border-white"
              }`}
              >
              Картой онлайн
              </button>

              <button
              type="button"
              onClick={() => setPaymentType("card_on_pickup")}
              className={`border px-6 py-4 uppercase ${
                paymentType === "card_on_pickup"
                  ? "bg-white text-[#1d2946]"
                  : "border-white"
              }`}
              >
              Картой при получении
              </button>

              <button
              type="button"
              onClick={() => setPaymentType("cash")}
              className={`border px-6 py-4 uppercase ${
                paymentType === "cash"
                  ? "bg-white text-[#1d2946]"
                  : "border-white"
              }`}
              >
              Наличными
              </button>
            </div>

            {deliveryType === "pickup" && (
              <div className="mt-6">
                <label className="uppercase">Кофейня для самовывоза</label>

                <select
                  value={cafeAddress}
                  onChange={(e) => setCafeAddress(e.target.value)}
                  className="mt-3 w-full border border-white/20 bg-[#1d2946] px-4 py-3"
                >
                  <option>Coffee Sea, ул. Морская, 10</option>
                  <option>Coffee Sea, ул. Светланская, 25</option>
                  <option>Coffee Sea, Набережная, 7</option>
                </select>
              </div>
            )}

            {deliveryType === "delivery" && (
              <div className="mt-6">
                <label className="uppercase">Адрес доставки</label>

                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите адрес"
                  className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 outline-none"
                />
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-3xl font-black uppercase">Итого: {total}₽</p>

              <button className="mt-6 border border-white px-8 py-4 uppercase hover:bg-white hover:text-[#1d2946]">
                Подтвердить заказ
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}