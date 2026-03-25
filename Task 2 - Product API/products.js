let products = [
  { id: 1, name: 'Notebook', price: 80 },
  { id: 2, name: 'Pen', price: 20 },
  { id: 3, name: 'Bag', price: 500 }
];

function getAllProducts() {
  return products;
}

function addProduct(product) {
  products.push(product);
}

function replaceProducts(newProducts) {
  products = newProducts;
}

module.exports = {
  getAllProducts,
  addProduct,
  replaceProducts
};
