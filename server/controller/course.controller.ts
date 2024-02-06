import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction, response } from "express";
import { catchAssycError } from "../middleware/catchAssyncError";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesSerivice } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
require('dotenv').config();

export const uploadCourse = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        createCourse(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

export const editCourse = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
        const courseId = req.params.id;
        const course = await CourseModel.findByIdAndUpdate(courseId, {
            $set: data
        }, {
            new: true
        })
        res.status(201).json({
            success: true,
            course,
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
export const getSingleCourse = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const courseId = req.params.id;
        const isCashedExist = await redis.get(courseId);

        if (isCashedExist) {
            const course = JSON.parse(isCashedExist);
            res.status(200).json({
                success: true,
                course,
            })
        } else {
            const course = await CourseModel.findById(courseId, {
                'courseData.videoUrl': 0,
                'courseData.suggestion': 0,
                'courseData.questions': 0,
                'courseData.links': 0,
            });

            await redis.set(courseId, JSON.stringify(course),"EX",604800)

            res.status(200).json({
                success: true,
                course,
            });
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
export const getAllCourse = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCashedExist = await redis.get("allCourses");
        if (isCashedExist) {
            const courses = JSON.parse(isCashedExist);
            res.status(200).json({
                success: true,
                courses
            })
        } else {

            const courses = await CourseModel.find().select({
                'courseData.videoUrl': 0,
                'courseData.suggestion': 0,
                'courseData.questions': 0,
                'courseData.links': 0,
            })
            await redis.set("allCourses", JSON.stringify(courses));
            res.status(200).json({
                success: true,
                courses,
            });
        }


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

export const getCourseByUser = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        console.log('userCourseList:', userCourseList);

        const courseId = req.params.id;

        console.log('courseId:', courseId);

        const courseExist = userCourseList?.find((course: any) => course._id === courseId);
        console.log('courseExist:', courseExist);

        if (!courseExist) {
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }

        const course = await CourseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const content = course?.courseData;


        // Process content or send it in the response as needed

        return res.status(200).json({
            success: true,
            content
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//add question in courses
interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IAddQuestionData = req.body;
        console.log(question, courseId, contentId);

        const course = await CourseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content id", 400));
        }
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler("Invalid contend id", 400));

        }
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: [],
        }
        courseContent.questions.push(newQuestion);
        await NotificationModel.create({
            user: req.user?._id,
            title: "New Question from Student",
            message: `You have a new question in ${course?.name} in video titled "${courseContent?.title}"`
        });

        await course?.save()
        return res.status(200).json({
            success: true,
            course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

interface IAddAnswerData {
    answer: string;
    courseId: string;
    contentId: string;
    questionId: string;
}
export const addAnswer = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;
        const course = await CourseModel.findById(courseId);
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler("Invalid content id", 400));
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler("Invalid question id", 400));
        }

        const newAnswer: any = {
            user: req.user,
            answer,
        };

        question.questionReplies?.push(newAnswer);
        await course?.save();
        if (req.user?._id === question.user._id) {
            await NotificationModel.create({
                user: req.user?._id,
                title: "New Question Reply Received",
                message: `You have a new question reply in ${course?.name} in video titled "${courseContent?.title}"`
            });
        } else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            };

            // Fix the typo in the template name
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"), data);

            try {
                await sendMail({
                    email: question.user.email,
                    subject: "Exciting Update: New Reply to Your Question",
                    template: "question-reply.ejs",
                    data,
                });
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        return res.status(200).json({
            success: true,
            course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
interface IAddReviewData {
    review: string;
    rating: number;
    userId: string;
}
export const addReviews = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const courseExist = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());
        console.log("courseexist", courseExist);

        if (!courseExist) {
            return next(new ErrorHandler("You are not eligible to access this course", 403)); // Change the status code to 403
        }

        const course = await CourseModel.findById(courseId);
        const { review, rating } = req.body as IAddReviewData;
        const reviewData: any = {
            user: req.user,
            comment: review,
            rating,
        };
        course?.reviews.push(reviewData);
        let avg = 0;
        course?.reviews.forEach((rev: any) => {
            avg += rev.rating;
        });
        if (course) {
            course.rating = avg / course.reviews.length;
        }
        await course?.save();
        const notification = {
            title: "New Review Recieved",
            message: `${req.user?.name} has given a review in ${course?.name}`,
        };
        // create notification
        return res.status(200).json({
            success: true,
            course,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});
//add reply in review
interface IAddReviewData {
    comment: string;
    courseId: string;
    reviewId: string;
}
export const addReplyToReview = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { comment, courseId, reviewId } = req.body as IAddReviewData;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        const review = course?.reviews?.find(
            (rev: any) => rev._id.toString() === reviewId
        )
        if (!review) {
            return next(new ErrorHandler("Review not found", 404));

        }
        const replyData: any = {
            user: req.user,
            comment,
        }
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        review.commentReplies?.push(replyData);
        await course?.save();
        // create notification
        return res.status(200).json({
            success: true,
            course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


export const getAllCourses = catchAssycError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await getAllCoursesSerivice(res); // Assuming getAllCoursesService is an asynchronous function
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );


  export const deleteCourse=catchAssycError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
       const {id}=req.params;
       const course=await CourseModel.findById(id);
       if(!course){
        return next(new ErrorHandler("User not Exist", 400));
       }
       await course.deleteOne({id});
       await redis.del(id);
       res.status(200).json({
        success:true,
        message:"course deleted successfully"
       })
  
      } catch (error: any) {      
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );