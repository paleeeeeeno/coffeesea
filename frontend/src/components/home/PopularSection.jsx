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

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Большая карточка */}
          {products[0] && (
            <article className="glass-card glow-hover overflow-hidden rounded-[32px]">
              <div className="overflow-hidden">
                <img
                  src={getProductImage(products[0])}
                  alt={products[0].name}
                  loading="lazy"
                  className="image-hover h-[420px] w-full object-cover"
                />
              </div>

              <div className="p-7">
                <h3 className="section-title text-5xl text-white">
                  {products[0].name}
                </h3>

                <p className="mt-4 text-lg uppercase leading-8 text-white/70">
                  {products[0].description}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-5xl font-black text-white">
                    {products[0].base_price}₽
                  </span>

                  <button
                    onClick={() => setSelectedProduct(products[0])}
                    className="border border-white px-8 py-4 uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#07101f]"
                  >
                    Выбрать
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Правая колонка */}
          <div className="grid gap-6">
            {/* Верхняя карточка */}
            {products[1] && (
              <article className="glass-card glow-hover overflow-hidden rounded-[32px]">
                <div className="overflow-hidden">
                  <img
                    src={getProductImage(products[1])}
                    alt={products[1].name}
                    loading="lazy"
                    className="image-hover h-[220px] w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="section-title text-4xl text-white">
                    {products[1].name}
                  </h3>

                  <p className="mt-3 uppercase leading-7 text-white/70">
                    {products[1].description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-4xl font-black text-white">
                      {products[1].base_price}₽
                    </span>

                    <button
                      onClick={() => setSelectedProduct(products[1])}
                      className="border border-white px-6 py-3 uppercase text-white transition hover:bg-white hover:text-[#07101f]"
                    >
                      Выбрать
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Нижние карточки */}
            <div className="grid gap-6 md:grid-cols-2">
              {products.slice(2, 4).map((product) => (
                <article
                  key={product.id}
                  className="glass-card glow-hover overflow-hidden rounded-[32px]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      loading="lazy"
                      className="image-hover h-[180px] w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="section-title text-3xl text-white">
                      {product.name}
                    </h3>

                    <p className="mt-3 uppercase leading-6 text-white/70">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-3xl font-black text-white">
                        {product.base_price}₽
                      </span>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="border border-white px-5 py-3 uppercase text-white transition hover:bg-white hover:text-[#07101f]"
                      >
                        Выбрать
                      </button>
                    </div>
                  </div>
                </article>
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