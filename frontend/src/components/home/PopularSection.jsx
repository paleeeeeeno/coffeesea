import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function PopularSection() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api
      .get("/products/popular/")
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch((err) => console.log(err));
  }, []);

  function getImage(product) {
    if (!product?.image) {
      return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085";
    }

    if (product.image.startsWith("http")) {
      return product.image;
    }

    return `http://127.0.0.1:8000${product.image}`;
  }

  function ProductModal({ product, onClose }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
    const [selectedModifiers, setSelectedModifiers] = useState([]);

    function toggleModifier(modifier) {
      const exists = selectedModifiers.find((item) => item.id === modifier.id);

      if (exists) {
        setSelectedModifiers(
          selectedModifiers.filter((item) => item.id !== modifier.id)
        );
      } else {
        setSelectedModifiers([...selectedModifiers, modifier]);
      }
    }

    function getFinalPrice() {
      const sizePrice = selectedSize
        ? Number(selectedSize.price)
        : Number(product.base_price);

      const modifiersPrice = selectedModifiers.reduce(
        (sum, item) => sum + Number(item.price),
        0
      );

      return sizePrice + modifiersPrice;
    }

    function addToCart() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart.push({
        id: Date.now(),
        productId: product.id,
        name: product.name,
        image: product.image,
        size: selectedSize,
        modifiers: selectedModifiers,
        quantity: 1,
        price: getFinalPrice(),
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      onClose();
      alert("Товар добавлен в корзину");
    }

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[26px] border border-white/20 bg-[#07101f] p-6 shadow-2xl">
          <div className="grid gap-6 md:grid-cols-2">
            <img
              src={getImage(product)}
              alt={product.name}
              className="h-80 w-full rounded-[18px] object-cover"
            />

            <div>
              <h2 className="section-title text-5xl uppercase text-white">
                {product.name}
              </h2>

              <p className="mt-4 uppercase leading-7 text-white/70">
                {product.description}
              </p>

              <h3 className="mt-6 text-xl font-black uppercase">Размер</h3>

              <div className="mt-3 flex flex-wrap gap-3">
                {product.sizes?.length > 0 ? (
                  product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-4 py-2 uppercase ${
                        selectedSize?.id === size.id
                          ? "bg-white text-[#07101f]"
                          : "border-white text-white"
                      }`}
                    >
                      {size.name} — {size.price}₽
                    </button>
                  ))
                ) : (
                  <p className="text-white/60">Размеры не добавлены</p>
                )}
              </div>

              <h3 className="mt-6 text-xl font-black uppercase">Добавки</h3>

              <div className="mt-3 grid gap-3">
                {product.modifiers?.length > 0 ? (
                  product.modifiers.map((modifier) => (
                    <label
                      key={modifier.id}
                      className="flex items-center gap-3 uppercase text-white/80"
                    >
                      <input
                        type="checkbox"
                        onChange={() => toggleModifier(modifier)}
                      />
                      {modifier.name} +{modifier.price}₽
                    </label>
                  ))
                ) : (
                  <p className="text-white/60">Добавки не добавлены</p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <strong className="text-4xl text-white">
                  {getFinalPrice()}₽
                </strong>

                <button
                  onClick={addToCart}
                  className="border border-white px-6 py-3 uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#07101f]"
                >
                  Добавить
                </button>
              </div>

              <button
                onClick={onClose}
                className="mt-6 uppercase text-white/50 hover:text-white"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length < 4) {
    return (
      <section className="wave-bg px-6 py-20">
        <p className="text-center uppercase text-white/60">
          Добавьте 4 популярных товара
        </p>
      </section>
    );
  }

  return (
    <section className="wave-bg relative overflow-hidden px-6 py-20">
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <h2 className="logo-text text-5xl leading-none text-[#f5f3ee] md:text-[100px]">
              Популярное
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          {/* БОЛЬШАЯ КАРТОЧКА */}
          <article className="group relative min-h-[560px] overflow-hidden rounded-[26px] border border-white/20 bg-[#07101f]">
            <img
              src={getImage(products[0])}
              alt={products[0].name}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-[#050b16]/30 to-transparent" />

            <div className="absolute bottom-0 left-0 z-10 p-8">

              <h3 className="section-title text-5xl uppercase leading-none text-white md:text-6xl">
                {products[0].name}
              </h3>

              <p className="mt-4 max-w-md text-lg uppercase leading-[1.5] text-white/75">
                {products[0].description}
              </p>

              <p className="mt-5 text-4xl font-black text-white">
                {products[0].base_price}₽
              </p>

              <button
                onClick={() => setSelectedProduct(products[0])}
                className="mt-5 border border-white px-10 py-3 text-base uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#07101f]"
              >
                В корзину
              </button>
            </div>
          </article>

          <div className="grid gap-5">
            {/* ЛАТТЕ */}
            <article className="group relative min-h-[320px] overflow-hidden rounded-[26px] border border-white/20 bg-[#07101f]">
              <img
                src={getImage(products[1])}
                alt={products[1].name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#050b16]/95 via-[#050b16]/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b16]/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 z-10 flex h-full max-w-[48%] flex-col justify-end p-8">
                <h3 className="section-title text-4xl uppercase leading-none text-white md:text-5xl">
                  {products[1].name}
                </h3>

                <p className="mt-3 text-base uppercase leading-[1.5] text-white/75">
                  {products[1].description}
                </p>

                <p className="mt-4 text-4xl font-black text-white">
                  {products[1].base_price}₽
                </p>

                <button
                  onClick={() => setSelectedProduct(products[1])}
                  className="mt-4 w-fit border border-white px-8 py-3 uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#07101f]"
                >
                  В корзину
                </button>
              </div>
            </article>

            {/* НИЖНИЕ ДВЕ */}
            <div className="grid gap-5 md:grid-cols-2">
              {[products[2], products[3]].map((product) => (
                <article
                  key={product.id}
                  className="group relative min-h-[270px] overflow-hidden rounded-[26px] border border-white/20 bg-[#07101f]"
                >
                  <img
                    src={getImage(product)}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b16] via-[#050b16]/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 z-10 p-6">
                    <h3 className="section-title text-3xl uppercase leading-none text-white md:text-4xl">
                      {product.name}
                    </h3>

                    <p className="mt-3 text-sm uppercase leading-[1.5] text-white/75">
                      {product.description}
                    </p>

                    <p className="mt-4 text-3xl font-black text-white">
                      {product.base_price}₽
                    </p>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="mt-4 border border-white px-8 py-3 text-sm uppercase tracking-[0.15em] text-white hover:bg-white hover:text-[#07101f]"
                    >
                      В корзину
                    </button>
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