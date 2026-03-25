const productModel = require("../models/productModel");

function getAllProducts(req, res) {
  const products = productModel.getAllProducts();
  res.json(products);
}

function getProductById(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    next({ status: 400, message: "Invalid id" });
    return;
  }

  const product = productModel.getProductById(id);

  if (!product) {
    next({ status: 404, message: "Product not found" });
    return;
  }

  res.json(product);
}

function addProduct(req, res, next) {
  const body = req.body;

  if (!body.name || body.price === undefined || !body.category) {
    next({ status: 400, message: "name, price and category are required" });
    return;
  }

  const allProducts = productModel.getAllProducts();

  const newProduct = {
    id: allProducts.length + 1,
    name: body.name,
    price: Number(body.price),
    category: body.category
  };

  productModel.addProduct(newProduct);
  res.status(201).json(newProduct);
}

module.exports = {
  getAllProducts,
  getProductById,
  addProduct
};
