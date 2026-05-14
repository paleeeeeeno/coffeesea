import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { api } from "../api/client";

import MenuProductCard from "../components/menu/MenuProductCard";
import ProductModal from "../components/menu/ProductModal";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Ошибка загрузки меню:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title="Меню — Coffee Sea"
        description="Меню Coffee Sea: кофе, десерты, напитки, сиропы и добавки."
      />

      <section className="wave-bg relative min-h-screen overflow-hidden px-6 py-20">
        <div className="absolute left-[-120px] top-40 h-[300px] w-[300px] animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <h1 className="logo-text fade-up text-center text-6xl uppercase md:text-8xl">
            Меню
          </h1>

          {loading && (
            <p className="mt-10 text-center uppercase text-white/70">
              Загрузка меню...
            </p>
          )}

          {!loading && products.length === 0 && (
            <p className="mt-10 text-center uppercase text-white/70">
              Товары пока не добавлены
            </p>
          )}

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <MenuProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
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
    </>
  );
}