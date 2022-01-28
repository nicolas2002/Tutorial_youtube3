const express = require("express");
const router = express.Router();
const { Products, Product_Category } = require("../models");
const { validateToken } = require("./../JWT");

router.get("/", validateToken, async (req, res) => {
  const listOfProducts = await Products.findAll();
  res.json(listOfProducts);
});

router.get("/byId/:id",validateToken, async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByPk(id);
  res.json(product);
});

router.post("/", validateToken, async (req, res) => {
  const product = req.body;
  const productCreated = await Products.create(product);
  const obj = {CategoryId: product.category, ProductId: productCreated.id};
  await Product_Category.create(obj);
  //const finded = await Product_Category.findAll();
  res.json(productCreated);
});

router.delete("/:productId", validateToken, async (req, res) => {
  const productId = req.params.productId;

  await Products.destroy({
    where: {
      id: productId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

router.put("/edit/:productId", validateToken, async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;
  const productFinded = await Products.findByPk(productId);
  await productFinded.update({
    name: product.name,
    stock: product.stock,
    price: product.price,
    description: product.description,
    sale: product.sale
  })
  await Product_Category.update(
    { CategoryId: product.category },
    { where: { ProductId: productId } 
  })
  res.json("UPDATED SUCCESSFULLY");

});
module.exports = router;