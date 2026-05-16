import { memo, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { getProductImage } from "../../utils/getProductImage";
import { getProductPrice, parsePrice } from "./MenuProductCard";

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [modifiers, setModifiers] = useState([]);
  const [added, setAdded] = useState(false);

  const sizes = useMemo(
    () => product?.sizes || product?.available_sizes || [],
    [product]
  );

  const availableModifiers = useMemo(
    () => product?.modifiers || product?.available_modifiers || [],
    [product]
  );

  const image = useMemo(() => getProductImage(product), [product]);

  useEffect(() => {
    setSelectedSize(sizes[0] || null);
    setModifiers([]);
    setAdded(false);
  }, [product, sizes]);

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  const finalPrice = useMemo(() => {
  const basePrice = getProductPrice(product);

  const selectedSizePrice = parsePrice(
    selectedSize?.price ??
      selectedSize?.base_price ??
      selectedSize?.basePrice
  );

  const sizePrice = selectedSizePrice > 0 ? selectedSizePrice : basePrice;

  const modifiersPrice = modifiers.reduce(
    (sum, modifier) =>
      sum +
      parsePrice(
        modifier?.price ||
          modifier?.extra_price ||
          modifier?.extraPrice ||
          modifier?.price_add ||
          modifier?.priceAdd
      ),
    0
  );

  return sizePrice + modifiersPrice;
}, [product, selectedSize, modifiers]);

  if (!product) return null;

  function toggleModifier(modifier) {
    setModifiers((current) => {
      const exists = current.some((item) => item.id === modifier.id);

      if (exists) {
        return current.filter((item) => item.id !== modifier.id);
      }

      return [...current, modifier];
    });
  }

  function addToCart() {
    const modifierIds = modifiers
      .map((modifier) => modifier.id || modifier.name)
      .sort()
      .join("-");

    const cartItem = {
      id: `${product.id || product.name}-${selectedSize?.id || selectedSize?.name || "base"}-${modifierIds}`,
      productId: product.id,
      name: product.name,
      image,
      size: selectedSize,
      modifiers,
      price: finalPrice,
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = currentCart.findIndex(
      (item) => item.id === cartItem.id
    );

    const nextCart =
      existingIndex >= 0
        ? currentCart.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: Number(item.quantity || 1) + 1 }
              : item
          )
        : [...currentCart, cartItem];

    localStorage.setItem("cart", JSON.stringify(nextCart));
    window.dispatchEvent(new Event("cart-updated"));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
      onClose?.();
    }, 650);
  }

  return createPortal(
    <div
      className="modal-root fixed inset-0 z-[9999999] overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Закрыть окно"
      />

      <div className="relative z-10 mx-auto my-8 w-full max-w-5xl">
        <div className="glass-card relative grid max-h-none w-full gap-6 overflow-hidden rounded-[28px] border border-white/20 p-5 shadow-2xl md:grid-cols-[0.9fr_1.1fr] md:p-7">
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn absolute right-4 top-4 z-20 flex items-center justify-center rounded-full border border-white/30 bg-[#07101f]/95 text-white transition hover:bg-white hover:text-[#07101f]"
            aria-label="Закрыть"
          >
            <X size={24} />
          </button>

          <div className="overflow-hidden rounded-[22px]">
            <img
              src={image}
              alt={product.name}
              className="h-[260px] w-full rounded-[22px] object-cover md:h-full md:min-h-[420px]"
              loading="eager"
              decoding="async"
              onError={(event) => {
                event.currentTarget.src = "/images/products/placeholder.jpg";
              }}
            />
          </div>

          <div className="flex flex-col gap-6 pt-2 md:p-6">
            <div>
              <h2 className="section-title pr-14 text-3xl text-white md:text-5xl">
                {product.name}
              </h2>

              {product.description && (
                <p className="mt-3 text-sm uppercase leading-7 text-white/65 md:text-base">
                  {product.description}
                </p>
              )}
            </div>

            {sizes.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                  Размер
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sizes.map((size) => {
                    const active = selectedSize?.id === size.id;

                    return (
                      <button
                        key={size.id || size.name}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-2xl border px-4 py-3 text-sm uppercase transition ${
                          active
                            ? "border-white bg-white text-[#07101f]"
                            : "border-white/25 text-white/75 hover:border-white"
                        }`}
                      >
                        {size.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {availableModifiers.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                  Добавки
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {availableModifiers.map((modifier) => {
                    const active = modifiers.some(
                      (item) => item.id === modifier.id
                    );

                    const price = parsePrice(
                      modifier.price ||
                        modifier.extra_price ||
                        modifier.extraPrice ||
                        modifier.price_add ||
                        modifier.priceAdd
                    );

                    return (
                      <button
                        key={modifier.id || modifier.name}
                        type="button"
                        onClick={() => toggleModifier(modifier)}
                        className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          active
                            ? "border-white bg-white text-[#07101f]"
                            : "border-white/25 text-white/75 hover:border-white"
                        }`}
                      >
                        <span>{modifier.name}</span>
                        {price > 0 && <span>+{price} ₽</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={addToCart}
              className="mt-auto rounded-2xl border border-white bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#07101f] transition hover:bg-transparent hover:text-white"
            >
              {added
                ? "Добавлено"
                : `В корзину · ${finalPrice.toLocaleString("ru-RU")} ₽`}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default memo(ProductModal);