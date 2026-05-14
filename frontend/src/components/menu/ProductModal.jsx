import { useState } from "react";
import { createPortal } from "react-dom";
import { getProductImage } from "../../utils/getProductImage";

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  function toggleModifier(modifier) {
    const exists = selectedModifiers.find((m) => m.id === modifier.id);

    if (exists) {
      setSelectedModifiers(
        selectedModifiers.filter((m) => m.id !== modifier.id)
      );
    } else {
      setSelectedModifiers([...selectedModifiers, modifier]);
    }
  }

  function getFinalPrice() {
    const sizePrice = selectedSize
      ? Number(selectedSize.price)
      : Number(product.base_price);

    const modifiersPrice = selectedModifiers.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    return sizePrice + modifiersPrice;
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      size: selectedSize,
      modifiers: selectedModifiers,
      quantity: 1,
      price: getFinalPrice(),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    onClose();
    alert("Товар добавлен в корзину");
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] overflow-y-auto overscroll-contain bg-black/80 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card relative mx-auto mt-10 w-full max-w-5xl rounded-[28px] p-5 md:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[1000000] flex h-11 w-11 min-w-0 items-center justify-center rounded-full border border-white/40 bg-[#07101f]/90 p-0 text-3xl leading-none text-white transition hover:bg-white hover:text-[#07101f]"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="grid gap-7 md:grid-cols-[0.95fr_1.05fr]">
          <img
            src={getProductImage(product)}
            alt={product.name}
            loading="lazy"
            className="h-[260px] w-full rounded-[20px] object-cover md:h-[460px]"
          />

          <div className="pr-0 md:pr-10">
            <h2 className="section-title max-w-[90%] text-3xl uppercase text-white md:text-5xl">
              {product.name}
            </h2>

            <p className="mt-4 text-sm uppercase leading-7 text-white/70 md:text-base">
              {product.description}
            </p>

            <h3 className="mt-6 text-lg font-black uppercase text-white">
              Размер
            </h3>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 text-sm uppercase transition ${
                      selectedSize?.id === size.id
                        ? "bg-white text-[#07101f]"
                        : "border-white text-white hover:bg-white hover:text-[#07101f]"
                    }`}
                  >
                    {size.name} — {size.price}₽
                  </button>
                ))
              ) : (
                <p className="text-white/55">Размеры не добавлены</p>
              )}
            </div>

            <h3 className="mt-6 text-lg font-black uppercase text-white">
              Добавки
            </h3>

            <div className="mt-3 grid gap-3">
              {product.modifiers?.length > 0 ? (
                product.modifiers.map((modifier) => (
                  <label
                    key={modifier.id}
                    className="flex items-center gap-3 text-sm uppercase text-white/80 md:text-base"
                  >
                    <input
                      type="checkbox"
                      onChange={() => toggleModifier(modifier)}
                      className="h-5 w-5"
                    />
                    {modifier.name} +{modifier.price}₽
                  </label>
                ))
              ) : (
                <p className="text-white/55">Добавки не добавлены</p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <strong className="text-4xl font-black text-white">
                {getFinalPrice()}₽
              </strong>

              <button
                onClick={addToCart}
                className="border border-white px-8 py-3 uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#07101f]"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}