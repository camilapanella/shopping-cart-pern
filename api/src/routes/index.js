const { Router } = require("express");
const products = require("./products.js");
const savedCart = require("./carts.js");
const router = Router();

// router.use('/recipes', recipes);
// router.use('/diets', types);
router.use("/products", products);
router.use("/carts", savedCart);

module.exports = router;