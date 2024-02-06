import userModel from "../models/user.model";
import { Response } from "express";
import { redis } from "../utils/redis";

// get user by idText
export const getUserById = async (id: string, res: Response) => {
    try {
        const userJson = await redis.get(id);

        if (userJson) {
            const user = JSON.parse(userJson);
            res.status(200).json({
                success: true,
                user,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found in Redis",
            });
        }
    } catch (error) {
        console.error("Error parsing JSON data from Redis:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//get alll user
export const getAllUsersSerivice=async(res:Response)=>{
    const users=await userModel.find().sort({createdAt:-1});
    res.status(200).json({
        success:true,
        users
    })
}

export const updateUserRoleService=async(res:Response,id:string,role:string)=>{
const user=await userModel.findByIdAndUpdate(id,{role},{new:true});
res.status(200).json({
    success:true,
    user,
})
}