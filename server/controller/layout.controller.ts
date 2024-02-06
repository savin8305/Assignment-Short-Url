import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction, response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";


export const createLayout=catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {type}=req.body;
    const isTypeExist=await LayoutModel.findOne({type});
    if(isTypeExist){
        return next(new ErrorHandler(`${type} already exist`, 400));
    }
    if(type==="Banner"){
        const {image,title,subTitle}=req.body;
        const myCloud=await cloudinary.v2.uploader.upload(image,{
            folder:"layout",
        })
        const banner={
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            title,
            subTitle
        }
        await LayoutModel.create();
    }
    if(type=="FAQ"){
       const {faq}=req.body;
       const faqItems=await Promise.all(
        faq.map(async (item:any)=>{
            return {
                question:item.question,
                answer:item.answer,
            }
        })
       )
       await LayoutModel.create({type:"FAQ",faq:faqItems});
    }
    if(type=="Categories"){
        const {categories}=req.body;
        const categoriesItems=await Promise.all(
            categories.map(async (item:any)=>{
                return {
                    title:item.title,
                }
            })
           )
        await LayoutModel.create({type:"Categories",categories:categoriesItems});
     }
     res.status(200).json({
        success:true,
        message:"Layout created SuccessFully"
     })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});


// eddit layout

export const editLayout=catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {type}=req.body;
    if(type==="Banner"){
        const bannerData:any=await LayoutModel.findOne({type:"Banner"})
        const {image,title,subTitle}=req.body;
        if(bannerData){
            await cloudinary.v2.uploader.destroy(bannerData.image.public_id)
         }
         const myCloud=await cloudinary.v2.uploader.upload(image,{
            folder:"layout",
        })
        const banner={
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            title,
            subTitle
        }
        await LayoutModel.findByIdAndUpdate(bannerData.id,{banner});
    }
    if(type=="FAQ"){
       const {faq}=req.body;
       const faqItem=await LayoutModel.findOne({type:"FAQ"})
       const faqItems=await Promise.all(
        faq.map(async (item:any)=>{
            return {
                question:item.question,
                answer:item.answer,
            }
        })
       )
       await LayoutModel.findByIdAndUpdate(faqItem?._id,{type:"FAQ",faq:faqItems});
    }
    if(type=="Categories"){
        const {categories}=req.body;
        const categoriesItem=await LayoutModel.findOne({type:"Categories"})
        const categoriesItems=await Promise.all(
            categories.map(async (item:any)=>{
                return {
                    title:item.title,
                }
            })
           )
        await LayoutModel.findByIdAndUpdate(categoriesItem?._id,{type:"Categories",categories:categoriesItems});
     }
     res.status(200).json({
        success:true,
        message:"Layout Updated  SuccessFully"
     })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//get layout by type

export const getLayOutByType=catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
    const {type}=req.body;
    const layout=await LayoutModel.findOne({type});
     res.status(201).json({
        success:true,
         layout
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});