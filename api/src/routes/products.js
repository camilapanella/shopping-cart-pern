const express = require("express");
const { Router } = require("express");
require("dotenv").config();
const { Product } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const data = await Product.findAll();
  res.status(200).send(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Product.findAll();
  if (id) {
    let productId = await data.filter((el) => el.id == id);
    if (productId.length) return res.status(200).send(productId);
    return res.status(404).send("Product not found");
  }
});

router.post("/", async (req, res) => {
  const { name, description, price, image, quantity } = req.body;
  try {
    if (!name) return res.status(400).send("Mandatory data missing");
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      quantity,
    });
    res.status(200).send("created successfully");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("success");
});
module.exports = router;
