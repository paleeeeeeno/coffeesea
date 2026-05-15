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

function PopularCard({ product, size = "small", onOpen }) {
  const image = getProductImage(product);
  const price = getPrice(product);

  const isBig = size === "big";
  const isWide = size === "wide";

  return (
    <article
      className={`glass-card glow-hover flex flex-col overflow-hidden rounded-[28px] border border-white/15 ${
        isBig
          ? "lg:h-[620px]"
          : isWide
            ? "lg:h-[300px]"
            : "lg:h-[314px]"
      }`}
    >
    
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="block w-full overflow-hidden"
      >
        <img
          src={image}
          alt={product?.name || "Товар"}
          loading="lazy"
          decoding="async"
          className={`image-hover w-full object-cover ${
          isBig
            ? "h-[340px] md:h-[380px]"
            : isWide
              ? "h-[170px] md:h-[180px]"
              : "h-[170px] md:h-[190px]"
        }`}
        />
      </button>

      <div className={`flex flex-1 flex-col ${isBig ? "p-7" : "p-5"}`}>
        <h3
          className={`section-title leading-[1] text-white ${
            isBig ? "text-[40px]" : isWide ? "text-[34px]" : "text-[28px]"
          }`}
        >
          {product?.name}
        </h3>

        {product?.description && (
          <p className="mt-3 line-clamp-3 text-sm uppercase leading-6 text-white/65 md:text-base">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <span
            className={`font-black text-white ${
              isBig ? "text-[38px]" : "text-[30px]"
            }`}
          >
            {price.toLocaleString("ru-RU")}₽
          </span>

          <button
            type="button"
            onClick={() => onOpen(product)}
            className="shrink-0 border border-white/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#07101f]"
          >
            Выбрать
          </button>
        </div>
      </div>
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

        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {products[0] && (
            <PopularCard
              product={products[0]}
              size="big"
              onOpen={setSelectedProduct}
            />
          )}

          <div className="grid gap-6">
            {products[1] && (
              <PopularCard
                product={products[1]}
                size="wide"
                onOpen={setSelectedProduct}
              />
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {products.slice(2, 4).map((product) => (
                <PopularCard
                  key={product.id || product.name}
                  product={product}
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