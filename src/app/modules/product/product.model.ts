import { model, Schema } from "mongoose";
import { IProduct, IVariants, ProductModel } from "./product.interface";
import AppError from "../../error/AppError";

const VariantSchema = new Schema<IVariants>({
    _id: false,
    type: { type: String, required: true },
    value: { type: String, required: true },
});

const ProductSchema = new Schema<IProduct, ProductModel>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true },
    inventory: {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, required: true },
    },
});



ProductSchema.statics.checkProductExists = async function (id: string) {
    const product = await this.findById(id);
    if (!product) throw new AppError(404, "Product not found");
};

const Product = model<IProduct, ProductModel>("Product", ProductSchema);

export default Product;
