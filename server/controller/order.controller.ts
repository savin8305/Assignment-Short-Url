import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction, response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import OrderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { getAllOrderSerivice, newOrder } from "../services/order.service";
export const createOrder = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;
        const user = await userModel.findById(req?.user?._id);

        const courseExistInUser = user?.courses.some((course: any) => course._id.toString() === courseId);

        if (courseExistInUser) {
            return next(new ErrorHandler("You have already purchased this course", 400));
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const data: any = {
            courseId: course._id,
            userId: user?._id,
            payment_info
        };

        const mailData: any = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            }
        };

        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), { order: mailData });

        try {
            if (user) {
                await sendMail({
                    email: user.email,
                    subject: "Welcome to a World of Knowledge: Your Course Details Are Here! 🌐",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }

        user?.courses.push(course?._id);
        await user?.save();

        const notification = await NotificationModel.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`
        });
        console.log("course.purchased-->",course.purchased);
        
        course.purchased = course.purchased ? course.purchased + 1 : 1;
        await course.save();
        
        newOrder(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export const getAllOrders = catchAssycError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getAllOrderSerivice(res); // Assuming getAllCoursesService is an asynchronous function
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );