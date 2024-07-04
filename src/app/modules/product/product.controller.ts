import { Request, Response } from "express";
import catchAsynch from "../../utils/catchAsynch";
import { productServices } from "./product.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";

const createProduct = catchAsynch(async (req: Request, res: Response) => {
    const result = await productServices.createProduct(req.body);
    return sendSuccessResponse(res, result, "Product created successfully", 201);
});

const getAllProducts = catchAsynch(async (req: Request, res: Response) => {
    const result = await productServices.getAllProducts(req.query);
    return sendSuccessResponse(
        res,
        result,
        req.query.searchTerm
            ? `Products matching search term '${req.query.searchTerm}' fetched successfully!`
            : "All products fetched successfully"
    );
});

const getProductById = catchAsynch(async (req: Request, res: Response) => {
    const result = await productServices.getProductById(req.params.id);
    return sendSuccessResponse(res, result, "Product fetched successfully");
});

const updateProduct = catchAsynch(async (req: Request, res: Response) => {
    const result = await productServices.updateProduct(req.params.id, req.body);
    return sendSuccessResponse(res, result, "Product updated successfully");
});

const deleteProduct = catchAsynch(async (req: Request, res: Response) => {
    await productServices.deleteProduct(req.params.id);
    return sendSuccessResponse(res, null, "Product deleted successfully");
});

export const productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
