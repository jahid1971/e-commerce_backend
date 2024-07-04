/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
    const result = await Product.create(payload);
    const product = (result as any).toObject();
    delete product.__v;
    delete product._id;
    return product;
};

const getAllProducts = async (query:Record<string, unknown>) => {
    const queryObject = { ...query };
    delete queryObject.searchTerm;

    if (query.searchTerm) {
        const searchableFields = ["name", "description", "category", "tags"];
        queryObject.$or = searchableFields.map((field) => ({
            [field]: { $regex: query.searchTerm, $options: "i" },
        }));
    }
    const result = await Product.find(queryObject).select("-__v");
    return result;
};

const getProductById = async (id: string) => {
    await Product.checkProductExists(id);

    const result = await Product.findById(id).select("-__v -_id");
    return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
    await Product.checkProductExists(id);
    const { inventory, ...remainingUpdateData } = payload;
    const modifiedUpdateData: any = remainingUpdateData;

    if (inventory && Object.keys(inventory).length) {
        for (const [key, value] of Object.entries(inventory)) {
            modifiedUpdateData[`inventory.${key}`] = value;
        }
    }

    const result = await Product.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    }).select("-__v -_id");

    return result;
};

const deleteProduct = async (id: string) => {
    await Product.checkProductExists(id);
    await Product.findByIdAndDelete(id);
};

export const productServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
