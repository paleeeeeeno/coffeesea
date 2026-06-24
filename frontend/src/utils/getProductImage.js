const productImages = {
  "капучино": "/images/products/kapuchino.webp",
  "латте": "/images/products/latte.webp",
  "американо": "/images/products/amerikano.webp",
  "раф ванильный": "/images/products/raf-vanilla.webp",
  "флэт уайт": "/images/products/flat-white.webp",

  "айс латте": "/images/products/ice-latte.webp",
  "бамбл": "/images/products/bumble.webp",
  "фраппе карамельный": "/images/products/frappe.webp",

  "матча латте": "/images/products/matcha-latte.webp",

  "круассан": "/images/products/kruassan.webp",
  "круассан миндальный": "/images/products/almond-croissant.webp",

  "мильфей": "/images/products/milfej.webp",
  "тирамису": "/images/products/tiramisu.webp",

  "облепиховый чай": "/images/products/sea-buckthorn-tea.webp",
  "таёжный чай": "/images/products/taiga-tea.webp",
};

function normalizeName(name = "") {
  return String(name).trim().toLowerCase();
}

export function getProductImage(product) {
  const name = normalizeName(product?.name);

  return productImages[name] || "/images/products/placeholder.jpg";
}