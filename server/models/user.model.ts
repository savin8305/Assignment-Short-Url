require('dotenv').config();
import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { timeStamp } from "console";
import jwt, { Secret } from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;

}

const userSchema: Schema<Iuser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide your name"],
  },
  email: {
    type: String,
    required: [true, "please Enter email"],
    unique: true,
    validate: {
      validator: function (value: string) {
        return emailRegexPattern.test(value);
      },
      message: "please enter a valid email",
    }
  },
  password: {
    type: String,
    minlength: [6, "Password must be atleast 6 character "],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Adjust the roles as needed
    default: "user", // Set the default role
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  courses: [
    {
      courseId: String
    }
  ]
}, { timestamps: true });
//hash password befor saving it
userSchema.pre<Iuser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})
//signin
userSchema.methods.SignAccessToken = async function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '',{
    expiresIn:"5m"
  });
}
//SIGN IN REFRESH TOKEN
userSchema.methods.SignRefreshToken = async function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '',{
    expiresIn:"5d"
  });
}
// Define a method to compare passwords
userSchema.methods.comparePassword = async function (
  enterdPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(enterdPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User: Model<Iuser> = mongoose.model<Iuser>("User", userSchema);

export default User;
