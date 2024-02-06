import { Response} from "express";
import CourseModel from "../models/course.model";
import { catchAssycError } from "../middleware/catchAssyncError";
import exp from "constants";
export const createCourse=catchAssycError(async(data:any,res:Response)=>{
    const course=await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    });
})

//get alll user
export const getAllCoursesSerivice=async(res:Response)=>{
    const courses=await CourseModel.find().sort({createdAt:-1});
    res.status(200).json({
        success:true,
        courses
    })
}