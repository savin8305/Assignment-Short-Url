// Import required modules and set up environment variables
require('dotenv').config();
import { Response } from "express";
import { Iuser } from "../models/user.model";
import { redis } from "./redis";
import jwt from "jsonwebtoken";

// Define token options interface
interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
}
 const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '3600', 10);
 const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

// Define options for access and refresh tokens
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60*60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60*60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
};
export const sendToken = async (user: Iuser, statusCode: number, res: Response) => {
  try {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN as string, { expiresIn: '1h' });
    const refreshToken = await user.SignRefreshToken(); // Await the resolution of the Promise

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    redis.set(user._id, JSON.stringify(user) as any);

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    console.error('Error in sendToken:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
