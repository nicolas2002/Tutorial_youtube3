const express = require("express");
const router = express.Router();
const { ProductCategory } = require("../models");

/*router.get("/", async (req, res) => {
  const listOfProductCategory = await ProductCategory.findAll();
  res.json(listOfProductCategory);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Categories.findByPk(id);
  res.json(category);
});

router.post("/", async (req, res) => {
  const product_category = req.body;
  await ProductCategory.create(product_category);
  res.json(product_category);
});*/

module.exports = router;