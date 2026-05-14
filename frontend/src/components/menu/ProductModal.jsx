import { useState } from "react";

export default function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  const imageUrl = product.image
    ? `http://127.0.0.1:8000${product.image}`
    : "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";

  function toggleModifier(modifier) {
    const exists = selectedModifiers.find((item) => item.id === modifier.id);

    if (exists) {
      setSelectedModifiers(
        selectedModifiers.filter((item) => item.id !== modifier.id)
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
      image: product.image,
      size: selectedSize,
      modifiers: selectedModifiers,
      quantity: 1,
      price: getFinalPrice(),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    onClose();
    alert("Товар добавлен в корзину");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/20 bg-[#07101f] p-6 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-80 w-full object-cover"
          />

          <div>
            <h2 className="text-4xl font-black uppercase">{product.name}</h2>

            <p className="mt-4 text-sm uppercase leading-6 text-white/70">
              {product.description}
            </p>

            <h3 className="mt-6 font-black uppercase">Размер</h3>

            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes?.length > 0 ? (
                product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 uppercase ${
                      selectedSize?.id === size.id
                        ? "bg-white text-[#1d2946]"
                        : "border-white"
                    }`}
                  >
                    {size.name} — {size.price}₽
                  </button>
                ))
              ) : (
                <p className="text-white/70">Размеры не добавлены</p>
              )}
            </div>

            <h3 className="mt-6 font-black uppercase">Добавки</h3>

            <div className="mt-3 grid gap-3">
              {product.modifiers?.length > 0 ? (
                product.modifiers.map((modifier) => (
                  <label
                    key={modifier.id}
                    className="flex items-center gap-3 uppercase text-white/80"
                  >
                    <input
                      type="checkbox"
                      onChange={() => toggleModifier(modifier)}
                    />
                    {modifier.name} +{modifier.price}₽
                  </label>
                ))
              ) : (
                <p className="text-white/70">Добавки не добавлены</p>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <strong className="text-3xl">{getFinalPrice()}₽</strong>

              <button
                onClick={addToCart}
                className="border border-white px-5 py-3 uppercase hover:bg-white hover:text-[#1d2946]"
              >
                В корзину
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-5 text-sm uppercase text-white/60 hover:text-white"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}