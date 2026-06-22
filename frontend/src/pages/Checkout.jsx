import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { api } from "../api/client";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [paymentType, setPaymentType] = useState("online");
  const [address, setAddress] = useState("");
  const [cafeAddress, setCafeAddress] = useState("Coffee Sea, ул. Морская, 10");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    } catch {
      setCart([]);
    }
  }, []);

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [cart]
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

 const items = cart.map((item) => {
  const productId =
    item.product?.id ||
    item.product_id ||
    item.id ||
    item.product;

  return {
    product: Number(productId),
    size: item.size?.id ? Number(item.size.id) : item.size_id ? Number(item.size_id) : null,
    modifiers: (item.modifiers || [])
      .map((modifier) => Number(modifier.id || modifier))
      .filter(Boolean),
    quantity: Number(item.quantity || 1),
    final_price: String(item.price || item.final_price || 0),
  };
});

  try {
    await api.post("/orders/", {
      delivery_type: deliveryType,
      address: deliveryType === "delivery" ? address : "",
      cafe_address: deliveryType === "pickup" ? cafeAddress : "",
      total_price: total,
      items: items,
    });

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
    navigate("/profile");
  } catch (err) {
    console.log("ОШИБКА ЗАКАЗА:", err.response?.data || err);
    setError("Ошибка оформления заказа. Проверьте вход в аккаунт.");
  }
}

  const optionClass = (active) =>
    `min-h-[58px] rounded-[14px] border px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] transition ${
      active
        ? "border-white bg-white text-[#1d2946]"
        : "border-white/45 bg-transparent text-white hover:border-white hover:bg-white/10"
    }`;

  return (
    <>
      <Seo
        title="Оформление — Coffee Sea"
        description="Оформление заказа Coffee Sea: самовывоз или доставка."
      />

      <section className="wave-bg page-section">
        <div className="page-container">
          <h1 className="page-title fade-up">
            Оформление
          </h1>

          <form
            onSubmit={createOrder}
            className="glass-card mx-auto mt-10 w-full max-w-4xl rounded-[28px] p-5 sm:p-7 md:p-8"
          >
            {error && (
              <p className="mb-6 rounded-xl bg-red-500/20 p-3 text-center text-sm uppercase text-red-100">
                {error}
              </p>
            )}

            <h2 className="section-title text-2xl text-white md:text-4xl">
              Способ получения
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryType("pickup")}
                className={optionClass(deliveryType === "pickup")}
              >
                Самовывоз
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType("delivery")}
                className={optionClass(deliveryType === "delivery")}
              >
                Доставка
              </button>
            </div>

            <h2 className="section-title mt-8 text-2xl text-white md:text-4xl">
              Способ оплаты
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentType("online")}
                className={optionClass(paymentType === "online")}
              >
                Картой онлайн
              </button>

              <button
                type="button"
                onClick={() => setPaymentType("card_on_pickup")}
                className={optionClass(paymentType === "card_on_pickup")}
              >
                Картой при получении
              </button>

              <button
                type="button"
                onClick={() => setPaymentType("cash")}
                className={optionClass(paymentType === "cash")}
              >
                Наличными
              </button>
            </div>

            {deliveryType === "pickup" && (
              <div className="mt-6">
                <label className="text-sm font-semibold uppercase text-white/80">
                  Кофейня для самовывоза
                </label>

                <select
                  value={cafeAddress}
                  onChange={(e) => setCafeAddress(e.target.value)}
                  className="form-field mt-3 w-full rounded-[14px] px-4 py-3"
                >
                  <option>Coffee Sea, ул. Морская, 10</option>
                  <option>Coffee Sea, ул. Светланская, 25</option>
                  <option>Coffee Sea, Набережная, 7</option>
                </select>
              </div>
            )}

            {deliveryType === "delivery" && (
              <div className="mt-6">
                <label className="text-sm font-semibold uppercase text-white/80">
                  Адрес доставки
                </label>

                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите адрес"
                  className="form-field mt-3 w-full rounded-[14px] px-4 py-3"
                />
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-2xl font-black uppercase md:text-4xl">
                Итого: {total.toLocaleString("ru-RU")}₽
              </p>

              <button
                type="submit"
                className="mt-6 w-full rounded-[14px] border border-white/70 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white hover:bg-white hover:text-[#07101f] sm:w-auto"
              >
                Подтвердить заказ
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}