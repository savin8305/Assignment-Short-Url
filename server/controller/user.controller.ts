import { Request, Response, NextFunction, response } from "express";
import User, { Iuser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAssycError } from "../middleware/catchAssyncError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs"
import path from "node:path";
import sendMail from "../utils/sendMail";
import userModel from "../models/user.model";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/Jwt";
import { redis } from "../utils/redis";
import { getAllUsersSerivice, getUserById, updateUserRoleService } from "../services/user.service";
import cloudinary from "cloudinary";
require('dotenv').config();
// Register userInfo
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export const registrationUser = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, avatar } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    const user: IRegistrationBody = {
      name,
      email,
      password,
      avatar,
    };
    const activationToken = createActivationToken(user); // Pass the user object
    // Add your code for handling the activation token here
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode }
    const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-Mail.ejs",
        data
      });
      res.status(201).json({
        success: true,
        message: `please check your email:${user.email} to activate your account`,
        activationToken: activationToken.token,
      })
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400))
    }
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

interface IActivationToken {
  token: string;
  activationCode: string;
}

// ...

// Update the parameter type to accept IRegistrationBody
export const createActivationToken = (user: IRegistrationBody): IActivationToken => {
  const activationCode = (Math.floor(1000 + Math.random() * 9000)).toString();
  // Return your activation token here
  const token = jwt.sign({
    user, activationCode
  },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m", // Fixed typo: Change 'expireIn' to 'expiresIn'
    });

  return { token, activationCode }; // Added the missing return statement to return the generated token
};
//activation of user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateUser = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_token, activation_code } = req.body as IActivationRequest;
    const secret = process.env.ACTIVATION_SECRET as string;

    const newUser: { user: Iuser; activationCode: string } = jwt.verify(
      activation_token,
      secret
    ) as { user: Iuser; activationCode: string };

    if (String(newUser.activationCode) !== String(activation_code)) {
      console.log('Mismatch:', newUser.activationCode, activation_code);
      return next(new ErrorHandler("Invalid code", 400));
    }
    const { name, email, password } = newUser.user;
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("This email is already in use", 400));
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true
    });

  } catch (error: any) {
    console.error('Activation Error:', error);
    return next(new ErrorHandler(error.message, 400));
  }
});

//  LOGIN User
interface ILoginRequest {
  email: string;
  password: string;
}
export const loginUser = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as ILoginRequest;
    if (!email || !password) {
      return next(new ErrorHandler("please enter email and password", 400))
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email and password", 400))
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email and password", 400))
    };
    sendToken(user, 200, res);

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400))
  }
})

export const logoutUser = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      res.status(200).json({
        success: true,
        message: "Loged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
)
export const updateAccessToken = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      console.log('Refresh Token:', refresh_token);
      const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
      const message = "Could not refresh token";
      console.log(typeof (decoded));

      if (!decoded || typeof decoded.id !== 'string') {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(new ErrorHandler("Please login to access this resourses", 400));
      }

      const user = JSON.parse(session);
      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, {
        expiresIn: '5m',
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN as string, {
        expiresIn: '5d',
      });
      req.user = user;
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);
      await redis.set(user._id,JSON.stringify(user),"EX",604800);
      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getUserInfo = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}
export const socialAuth = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

// Updating user info
interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email }: IUpdateUserInfo = req.body;

      // Get the user ID from the authenticated user's information
      const userId = req.user?._id;

      // Fetch the user from the database
      const user = await userModel.findById(userId);

      // Check if the user exists
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Check if email is provided for update

      // Update name if provided
      if (name) {
        user.name = name;
      }

      // Save the updated user information
      await user.save();

      // Update user data in Redis
      await redis.set(userId, JSON.stringify(user));

      // Respond with the updated user information
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update password
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;
      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("please enter old and new password", 400))
      }
      // Retrieve the user from the database
      const user = await userModel.findById(req.user?._id).select("+password");

      // Check if the user exists
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Check if the user has a password property
      if (user?.password == undefined) {
        return next(new ErrorHandler("Invalid user", 400));
      }

      // Compare old password
      const isPasswordMatch = await user.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      // Update password and save to the database
      user.password = newPassword;
      await user.save();
      await redis.set(req.user?._id, JSON.stringify(user));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update profile picture
interface IUpdateProfilePicture {
  avatar: string;
}

export const updateProfilePicture = catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;
      const userId = req?.user?._id;

      if (!userId) {
        return next(new ErrorHandler("User ID not found", 400));
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      if (avatar) {
        // If the user already has an avatar, delete the old one from Cloudinary
        if (user.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        // Upload the new avatar to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });

        // Update user's avatar information
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // Save the updated user information
      await user?.save();
      await redis.set(req.user?._id, JSON.stringify(user));

      // Respond with the updated user information
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      console.log("error-message"+error);
      
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
//get all users

export const getAllUser=catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersSerivice(res);
    } catch (error: any) {      
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//udpate user roles-admin only
export const updateUserRoles=catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
     const {id,role}=req.body;
     updateUserRoleService(res,id,role);
    } catch (error: any) {      
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteUser=catchAssycError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
     const {id}=req.params;
     const user=await userModel.findById(id);
     if(!user){
      return next(new ErrorHandler("User not Exist", 400));
     }
     await user.deleteOne({id});
     await redis.del(id);
     res.status(200).json({
      success:true,
      message:"user deleted successfully"
     })

    } catch (error: any) {      
      return next(new ErrorHandler(error.message, 400));
    }
  }
);