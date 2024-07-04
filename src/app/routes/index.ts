import { Router } from "express";
import { productRoutes } from "../modules/product/product.route";
import { orderRoutes } from "../modules/order/order.route";

const router = Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

export default router;
