import { NextFunction, Response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

export const newOrder = catchAssycError(async (data: any, res: Response, next: NextFunction) => {
    try {
        const order = await OrderModel.create(data);
        console.log('Order created:', order);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error: any) {
        console.error('Error creating order:', error);
        next(new ErrorHandler(error.message, 500));
    }
});


//get alll user
export const getAllOrderSerivice=async(res:Response)=>{
    const orders=await OrderModel.find().sort({createdAt:-1});
    res.status(200).json({
        success:true,
        orders
    })
}