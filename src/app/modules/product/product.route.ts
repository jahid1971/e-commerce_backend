import { Router } from "express";
import validateRequest from "../../middlewears/validateRequest";
import { productValidations } from "./product.validation";
import { productController } from "./product.controller";

const router = Router();

router.post(
    "/",
    validateRequest(productValidations.productValidationSchema),
    productController.createProduct
);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export const productRoutes = router;
