import { useEffect, useMemo, useState } from "react";
import Seo from "../components/Seo";
import { api } from "../api/client";
import MenuProductCard, {
  getProductPrice,
} from "../components/menu/MenuProductCard";
import ProductModal from "../components/menu/ProductModal";

const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "name-asc", label: "По названию А–Я" },
  { value: "name-desc", label: "По названию Я–А" },
];

function normalizeProducts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function getCategoryName(product) {
  if (typeof product?.category === "string") return product.category;
  return product?.category?.name || product?.category_name || "Все";
}

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");

    api
      .get("/products/")
      .then((res) => {
        if (!ignore) setProducts(normalizeProducts(res.data));
      })
      .catch((err) => {
        console.log("Ошибка загрузки меню:", err);

        if (!ignore) {
          setProducts([]);
          setError("Не удалось загрузить меню");
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = new Set();

    products.forEach((product) => {
      const name = getCategoryName(product);
      if (name && name !== "Все") unique.add(name);
    });

    return Array.from(unique).sort((a, b) => a.localeCompare(b, "ru"));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const name = product?.name?.toLowerCase() || "";
      const description = product?.description?.toLowerCase() || "";
      const productCategory = getCategoryName(product);

      const matchesSearch =
        !query || name.includes(query) || description.includes(query);

      const matchesCategory =
        category === "all" || productCategory === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      const priceA = getProductPrice(a);
      const priceB = getProductPrice(b);
      const nameA = a?.name || "";
      const nameB = b?.name || "";

      if (sort === "price-asc") return priceA - priceB;
      if (sort === "price-desc") return priceB - priceA;
      if (sort === "name-asc") return nameA.localeCompare(nameB, "ru");
      if (sort === "name-desc") return nameB.localeCompare(nameA, "ru");

      return 0;
    });
  }, [products, search, category, sort]);

  return (
    <>
      <Seo
        title="Меню — Coffee Sea"
        description="Меню Coffee Sea: кофе, десерты, напитки, сиропы и добавки."
      />

      <section className="wave-bg page-section">
        <div className="page-container">
          <h1 className="page-title menu-title">Меню</h1>

          <div className="glass-card mt-10 grid gap-4 rounded-[28px] p-4 md:grid-cols-[1.4fr_1fr_1fr] md:p-5">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                Поиск
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Найти кофе или десерт"
                className="form-field rounded-2xl px-4 py-3"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                Категория
              </span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="form-field rounded-2xl px-4 py-3"
              >
                <option value="all">Все категории</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                Сортировка
              </span>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="form-field rounded-2xl px-4 py-3"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {loading && (
            <p className="mt-10 text-center uppercase text-white/70">
              Загрузка меню...
            </p>
          )}

          {!loading && error && (
            <p className="mt-10 text-center uppercase text-red-200">
              {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="mt-10 text-center uppercase text-white/70">
              Товары пока не добавлены
            </p>
          )}

          {!loading &&
            !error &&
            products.length > 0 &&
            filteredProducts.length === 0 && (
              <p className="mt-10 text-center uppercase text-white/70">
                Ничего не найдено
              </p>
            )}

          <div className="menu-grid mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <MenuProductCard
                key={product.id || product.name}
                product={product}
                onOpen={setSelectedProduct}
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