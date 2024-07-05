/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import AppError from "../../error/AppError";
import Product from "../product/product.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (orderData: IOrder) => {
    const product = await Product.findOne({ _id: orderData.productId, "inventory.inStock": true });
    if (!product) throw new AppError(400, "Product is out of stock");

    if (product.inventory.quantity < orderData.quantity) {
        throw new AppError(400, "Available product is less than order quantity");
    }
    let result;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const updatedQuantity = product.inventory.quantity - orderData.quantity;
        const updateData =
            updatedQuantity === 0
                ? { inventory: { quantity: updatedQuantity, inStock: false } }
                : { "inventory.quantity": updatedQuantity };

        await Product.findByIdAndUpdate(orderData.productId, updateData, { runValidators: true, session });
        result = await Order.create([orderData], { session });

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        // console.log(error);
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, "Order creation failed");
    }
    const order = (result as any)[0].toObject();
    delete order.__v;
    delete order._id;
    return order;
};

const getAllOrders = async (query: Record<string, unknown>) => {
    const result = await Order.find(query).select("-__v");
    if (result?.length < 1) throw new AppError(404, "Order not found");
    return result;
};

export const orderServices = {
    createOrder,
    getAllOrders,
};
