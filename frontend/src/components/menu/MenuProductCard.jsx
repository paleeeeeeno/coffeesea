import { getProductImage } from "../../utils/getProductImage";

export default function MenuProductCard({ product, onSelect }) {
  return (
    <article className="glass-card glow-hover overflow-hidden rounded-[28px]">
      <div className="overflow-hidden">
        <img
          src={getProductImage(product)}
          alt={product.name}
          loading="lazy"
          className="image-hover h-[260px] w-full object-cover md:h-[320px]"
        />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="section-title text-3xl leading-none text-white md:text-4xl">
            {product.name}
          </h2>

          <span className="text-3xl font-black text-white md:text-4xl">
            {product.base_price}₽
          </span>
        </div>

        <p className="mt-4 min-h-[72px] text-sm uppercase leading-6 text-white/65 md:text-base">
          {product.description}
        </p>

        <button
          onClick={() => onSelect(product)}
          className="mt-6 w-full border border-white px-6 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#07101f]"
        >
          Выбрать
        </button>
      </div>
    </article>
  );
}