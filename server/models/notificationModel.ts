import { Document, Schema, model } from "mongoose";

export interface INotification extends Document {
    title: string;
    message: string;
    status: string;
    userId: string;
}

const notificationSchema = new Schema<INotification>(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required:true,
            default: "unread", // You can set a default value or remove this line if not needed
        },
        
    },
    { timestamps: true } // Assuming you want to include timestamps for when the notification is created/updated
);

const NotificationModel = model<INotification>("Notification", notificationSchema);

export default NotificationModel;
