import { getProductImage } from "../utils/getProductImage";

export default function ProductCard({ product }) {
  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({
      id: `${product.id}-${Date.now()}`,
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
    <article className="glass-card glow-hover overflow-hidden rounded-[28px]">
      <img
        src={getProductImage(product)}
        alt={product.name}
        loading="lazy"
        width="420"
        height="260"
        className="image-hover h-56 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="section-title text-3xl">{product.name}</h3>

        <p className="mt-3 min-h-[60px] text-sm uppercase leading-6 text-white/70">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-3xl font-black">{product.base_price}₽</span>

          <button
            type="button"
            onClick={addToCart}
            className="icon-button flex h-10 w-10 items-center justify-center rounded-full border border-white text-xl transition hover:bg-white hover:text-[#1d2946]"
            aria-label={`Добавить ${product.name} в корзину`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
