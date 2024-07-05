/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsynch from "../../utils/catchAsynch";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { orderServices } from "./order.service";

const createOrder = catchAsynch(async (req, res) => {
    const result = await orderServices.createOrder(req.body);
    return sendSuccessResponse(res, result, "Order created successfully", 201);
});

const getAllOrders = catchAsynch(async (req: Request, res: Response) => {
    const result = await orderServices.getAllOrders(req.query);
    return sendSuccessResponse(
        res,
        result,
        req.query.email ? "Orders fetched successfully for userEmail" : "All orders fetched successfully"
    );
});

export const orderControllers = {
    createOrder,
    getAllOrders,
};
