let products = [
  { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
  { id: 2, name: "Book", price: 500, category: "Education" }
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  for (let i = 0; i < products.length; i = i + 1) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

function addProduct(product) {
  products.push(product);
  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct
};
