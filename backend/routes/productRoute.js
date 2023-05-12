const express = require("express");
const {
	getAllProducts,
	createProduct,
	updateProducts,
	deleteProducts,
	getProductDetails,
	createProductReview,
	getProductReviews,
	deleteReview,
	getAdminProducts,
} = require("../controllers/productControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
	.route("/admin/products")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
	.route("/admin/product/new")
	.post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
	.route("/admin/product/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateProducts)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
	.route("/reviews")
	.get(getProductReviews)
	.delete(isAuthenticatedUser, deleteReview);

module.exports = router;
