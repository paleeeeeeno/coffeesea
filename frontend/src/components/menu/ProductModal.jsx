import { useMemo } from "react";
import { getProductImage } from "../../utils/getProductImage";

export function parsePrice(value) {
  if (value === null || value === undefined) return 0;

  const normalized = Number(
    String(value)
      .replace(",", ".")
      .replace(/[^\d.]/g, "")
  );

  return Number.isFinite(normalized) ? normalized : 0;
}

export function getProductPrice(product) {
  return parsePrice(
    product?.base_price ??
      product?.basePrice ??
      product?.price ??
      product?.final_price ??
      0
  );
}

export default function MenuProductCard({
  product,
  onSelect,
  onOpen,
}) {
  const image = useMemo(() => getProductImage(product), [product]);

  const price = useMemo(
    () => getProductPrice(product),
    [product]
  );

  const openModal = () => {
    if (onSelect) onSelect(product);
    if (onOpen) onOpen(product);
  };

  return (
    <article className="menu-card glass-card glow-hover flex h-full flex-col overflow-hidden rounded-[26px] border border-white/15">
      <button
        type="button"
        onClick={openModal}
        className="block overflow-hidden"
      >
        <img
          src={image}
          alt={product?.name || "Товар"}
          loading="lazy"
          decoding="async"
          className="image-hover h-[260px] w-full object-cover"
        />
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h2 className="section-title text-[30px] leading-[0.92] text-white md:text-[34px]">
          {product?.name}
        </h2>

        {product?.description && (
          <p className="mt-4 line-clamp-3 text-sm uppercase leading-6 text-white/65 md:text-base">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="text-[32px] font-black text-white md:text-[38px]">
            {price.toLocaleString("ru-RU")}₽
          </span>

          <button
            type="button"
            onClick={openModal}
            className="shrink-0 rounded-full border border-white/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#07101f]"
          >
            Выбрать
          </button>
        </div>
      </div>
    </article>
  );
}