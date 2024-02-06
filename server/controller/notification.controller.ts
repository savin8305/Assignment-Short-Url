import ErrorHandler from "../utils/ErrorHandler";
import e, { Request, Response, NextFunction, response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import NotificationModel from "../models/notificationModel";
import cron from "node-cron"
export const getNotifications = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            notifications
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
//update notification

export const updateNotification=catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id);
        if(!notification){
           return next(new ErrorHandler("Notification not found",404));
        }else{
            notification.status=notification.status?notification.status="read":notification?.status;
        }
        await notification.save()
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            notifications
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//delete notification

cron.schedule("0 0 0 * * *",async()=>{
    const thirtyDaysAgo=new Date(Date.now()-30*24*60*60*1000)
    await NotificationModel.deleteMany({status:"read",createdAt:{$lt:thirtyDaysAgo}});
    console.log("Deleted read notifications");
    
})