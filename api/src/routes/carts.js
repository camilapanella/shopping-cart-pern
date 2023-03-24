const express = require("express");
const { Router } = require("express");
require("dotenv").config();
const { SavedCart } = require("../db.js");
const { Product } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const data = await SavedCart.findAll({ include: Product });
  res.status(200).send(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await SavedCart.findAll({ include: Product });
  if (id) {
    let cartId = await data.filter((el) => el.id == id);
    if (cartId.length) return res.status(200).send(cartId);
    return res.status(404).send("Cart not found");
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await SavedCart.create(req.body);
    res.status(200).send(newCart);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await SavedCart.destroy({ where: { id: id } });
  res.status(200).send("success");
});
module.exports = router;
