export default function MenuProductCard({ product, onSelect }) {
  function getImage(product) {
    if (!product?.image) {
      return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";
    }

    if (product.image.startsWith("http")) {
      return product.image;
    }

    return `http://127.0.0.1:8000${product.image}`;
  }

  return (
    <article className="glass-card glow-hover overflow-hidden rounded-[24px] shadow-2xl">
      <img
        src={getImage(product)}
        alt={product.name}
        className="h-64 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="section-title text-3xl uppercase text-white">
          {product.name}
        </h2>

        <p className="mt-3 min-h-[70px] text-sm uppercase leading-6 text-white/70">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-3xl font-black text-white">
            {product.base_price}₽
          </span>

          <button
            onClick={() => onSelect(product)}
            className="rounded-full border border-white px-4 py-2 uppercase text-white hover:bg-white hover:text-[#07101f]"
          >
            Выбрать
          </button>
        </div>
      </div>
    </article>
  );
}