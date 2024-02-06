import { Request, Response, NextFunction } from "express";
import { catchAssycError } from "./catchAssyncError";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { Iuser } from "../models/user.model";
export const isAuthenticated = catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("access-token"+req.cookies.access_token);
        
        const access_token = req.cookies.access_token;

        // Check if access_token is missing or empty
        if (!access_token) {
            return next(new ErrorHandler("Please login to access this resource", 401)); // Changed status code to 401 (Unauthorized)
        }

        // Verify the access token
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

        // Check if the decoded token is invalid
        if (!decoded) {
            return next(new ErrorHandler("Access token is not valid", 401)); // Changed status code to 401 (Unauthorized)
        }

        // Fetch user data from Redis using the decoded ID
        const user = await redis.get(decoded.id);

        // Check if user is not found in Redis
        if (!user) {
            return next(new ErrorHandler("Please Login to Access this Resources", 401)); // Changed status code to 401 (Unauthorized)
        }

        // Attach the user object to the request for further processing
        req.user = JSON.parse(user);

        // Continue to the next middleware
        next();
    } catch (error) {
        console.error("Error verifying access token:", error);
        // Handle other errors that might occur during token verification
        return next(new ErrorHandler("Error verifying access token", 500)); // Changed status code to 500 (Internal Server Error)
    }
});

export const authorizeRoles = (...roles: string[]) => catchAssycError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Ensure 'req.user' is defined and has a 'role' property
        const user = req.user as Iuser | undefined;

        if (!user || !user.role) {
            throw new ErrorHandler("Unauthorized: User or role not found", 403);
        }

        // Check if the user has the required role
        const isAuthorized = roles.some(role => role === user.role);

        if (!isAuthorized) {
            throw new ErrorHandler("Unauthorized: Insufficient role permissions", 403);
        }

        // User has the required role, proceed to the next middleware
        next();
    } catch (error) {
        next(new ErrorHandler("Admin only can access this features", 500));
    }
});