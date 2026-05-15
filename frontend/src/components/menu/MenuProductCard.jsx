import { useMemo } from "react";
import { getProductImage } from "../../utils/getProductImage";

export default function MenuProductCard({ product, onSelect }) {
  const image = useMemo(() => getProductImage(product), [product]);

  return (
    <article className="menu-card glass-card glow-hover overflow-hidden rounded-[24px] shadow-2xl">
      <img
        src={image}
        alt={product.name}
        loading="lazy"
        className="h-64 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="section-title text-3xl uppercase text-white">
          {product.name}
        </h2>

        <p className="mt-3 min-h-[70px] text-sm uppercase leading-6 text-white/70">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-3xl font-black text-white">
            {product.base_price}₽
          </span>

          <button
            type="button"
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