import { Router } from "express";
import { orderControllers } from "./order.controller";
import validateRequest from "../../middlewears/validateRequest";
import { orderValidations } from "./order.validation";

const router = Router();

router.post("/", validateRequest(orderValidations.orderValidationSchema), orderControllers.createOrder);
router.get("/", orderControllers.getAllOrders);

export const orderRoutes = router;
