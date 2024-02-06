import { timeStamp } from "console";
import mongoose, { Document, Schema, Model } from "mongoose";
export interface IOrder extends Document {
    courseId: string;
    userId: string;
    payment_info: {
        method: string;
        amount: number;
    };
}
const orderSchema = new Schema<IOrder>(
    {
        courseId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
        },
        payment_info: {
            type: Object,
        },
    },
    { timestamps: true } 
);

const OrderModel:Model<IOrder>=mongoose.model('Order',orderSchema);
export default OrderModel;