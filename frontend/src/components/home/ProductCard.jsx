export default function ProductCard({ product }) {
  const imageUrl = product.image
    ? `http://127.0.0.1:8000${product.image}`
    : "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      image: product.image,
      quantity: 1,
      price: Number(product.base_price),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар добавлен в корзину");
  }

  return (
    <article className="overflow-hidden border border-white/10 bg-[#07101f]/80 shadow-2xl backdrop-blur-sm transition hover:-translate-y-1">
      <img
        src={imageUrl}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="section-title text-3xl">
          {product.name}
        </h3>

        <p className="mt-3 min-h-[60px] text-sm uppercase leading-6 text-white/70">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-3xl font-black">
            {product.base_price}₽
          </span>

          <button
            onClick={addToCart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-xl hover:bg-white hover:text-[#1d2946]"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}