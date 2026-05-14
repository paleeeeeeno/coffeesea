const productImages = {
  Капучино: "/images/products/cappuccino.jpg",
  Латте: "/images/products/latte.jpg",
  Круассан: "/images/products/croissant.jpg",
  Мильфей: "/images/products/milfey.jpg",
  Американо: "/images/products/americano.jpg",
  Раф: "/images/products/raf.jpg",
};

export function getProductImage(product) {
  return productImages[product?.name] || "/images/products/placeholder.jpg";
}