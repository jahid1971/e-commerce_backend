/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IVariants {
    _id?: false;
    type: string;
    value: string;
}

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    variants: IVariants[];
    tags: string[];
    inventory: {
        quantity: number;
        inStock: boolean;
    };
}

export interface ProductModel extends Model<IProduct> {
    checkProductExists(id:string): Promise<void>;
}
