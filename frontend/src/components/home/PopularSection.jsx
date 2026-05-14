import { useEffect, useState } from "react";

import { api } from "../../api/client";

import ProductModal from "../menu/ProductModal";

import { getProductImage } from "../../utils/getProductImage";

export default function PopularSection() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api
      .get("/products/popular/")
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="wave-bg page-section">
      <div className="page-container">
        <h2 className="page-title fade-up">Популярное</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="glass-card glow-hover overflow-hidden rounded-[28px]"
            >
              <div className="overflow-hidden">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  loading="lazy"
                  className="image-hover h-[260px] w-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="section-title text-3xl text-white">
                  {product.name}
                </h3>

                <p className="mt-3 line-clamp-2 uppercase leading-6 text-white/70">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-4xl font-black text-white">
                    {product.base_price}₽
                  </span>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="border border-white px-5 py-3 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#07101f]"
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </article>
          ))}
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