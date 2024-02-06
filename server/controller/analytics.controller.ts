import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction, response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import { generateLast12MonthData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";


export const getUserAnalytics= catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const users=await generateLast12MonthData(userModel);
       res.status(200).json({
        success:true,
        users,
       })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
export const getCourseAnalytics= catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const course=await generateLast12MonthData(CourseModel);
       res.status(200).json({
        success:true,
        course,
       })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
export const getOrderAnalytics= catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const order=await generateLast12MonthData(OrderModel);
       res.status(200).json({
        success:true,
        order,
       })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});