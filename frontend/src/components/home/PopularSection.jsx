import { useEffect, useState } from "react";
import { api } from "../../api/client";
import ProductModal from "../menu/ProductModal";
import { getProductImage } from "../../utils/getProductImage";

function getPrice(product) {
  const raw =
    product?.base_price ??
    product?.basePrice ??
    product?.price ??
    product?.final_price ??
    0;

  const value = Number(String(raw).replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function PopularCard({ product, variant = "small", onOpen }) {
  const image = getProductImage(product);
  const price = getPrice(product);

  const isBig = variant === "big";
  const isWide = variant === "wide";

  return (
    <article
      className={`popular-card group relative overflow-hidden rounded-[28px] border border-white/20 bg-[#07101f] shadow-2xl ${
        isBig ? "min-h-[520px]" : isWide ? "min-h-[260px]" : "min-h-[260px]"
      }`}
    >
      <img
        src={image}
        alt={product?.name || "Товар"}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/95 via-[#07101f]/55 to-black/20" />

      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative z-10 flex h-full w-full flex-col items-start justify-end p-6 text-left md:p-7"
      >
        <span className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d6a866]">
          Coffee Sea
        </span>

        <h3
          className={`section-title text-white ${
            isBig ? "text-[54px]" : isWide ? "text-[46px]" : "text-[34px]"
          }`}
        >
          {product?.name}
        </h3>

        {product?.description && (
          <p
            className={`mt-3 max-w-md uppercase text-white/75 ${
              isBig ? "text-base leading-7" : "text-sm leading-6"
            }`}
          >
            {product.description}
          </p>
        )}

        <p
          className={`mt-5 font-black text-white ${
            isBig ? "text-[42px]" : "text-[32px]"
          }`}
        >
          {price.toLocaleString("ru-RU")}₽
        </p>

        <span className="mt-4 inline-flex border border-white/80 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition group-hover:bg-white group-hover:text-[#07101f]">
          В корзину
        </span>
      </button>
    </article>
  );
}

export default function PopularSection() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let ignore = false;

    api
      .get("/products/popular/")
      .then((res) => {
        if (ignore) return;

        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.results)
            ? res.data.results
            : [];

        setProducts(data.slice(0, 4));
      })
      .catch((err) => console.log("Ошибка загрузки популярных:", err));

    return () => {
      ignore = true;
    };
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="wave-bg page-section overflow-hidden">
      <div className="page-container">
        <h2 className="page-title mb-10">Популярное</h2>

        <div className="mx-auto grid max-w-[1320px] gap-6 lg:grid-cols-[1.1fr_1fr]">
          {products[0] && (
            <PopularCard
              product={products[0]}
              variant="big"
              onOpen={setSelectedProduct}
            />
          )}

          <div className="grid gap-6">
            {products[1] && (
              <PopularCard
                product={products[1]}
                variant="wide"
                onOpen={setSelectedProduct}
              />
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {products.slice(2, 4).map((product) => (
                <PopularCard
                  key={product.id || product.name}
                  product={product}
                  variant="small"
                  onOpen={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}