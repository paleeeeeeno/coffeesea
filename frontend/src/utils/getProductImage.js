const productImages = {
  капучино: "/images/products/cappuccino.jpg",
  латте: "/images/products/latte.jpg",
  круассан: "/images/products/croissant.jpg",
  мильфей: "/images/products/milfey.jpg",
  американо: "/images/products/americano.jpg",
  раф: "/images/products/raf.jpg",
};

function normalizeName(name = "") {
  return String(name).trim().toLowerCase();
}

export function getProductImage(product) {
  const name = normalizeName(product?.name);

  return (
    productImages[name] ||
    "/images/products/placeholder.jpg"
  );
}
