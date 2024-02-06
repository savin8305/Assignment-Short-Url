import React, { FC, useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import toast from "react-hot-toast";

type ChangePasswordProps = {
  // Add any necessary props here
};

const ChangePassword: FC<ChangePasswordProps> = () => {
  // State for managing form inputs
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword,{isSuccess,error}] =useUpdatePasswordMutation()
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if( newPassword!==confirmPassword){
        toast.error("Password do not match")
    } 
    await updatePassword({oldPassword,newPassword})
  };
  useEffect(()=>{
    if(isSuccess){
        toast.success("Password updated successfully")
    }
    if(error){
        if("data" in error){
            const errorData=error as any;
            toast.error(errorData.data.message || "Invalid oldpassword")
        }
    }

  },[isSuccess,error])
  return (
    <div className="animation-container flex flex-col items-center">
      <h1 className="font-Poppins text-5xl font-extrabold text-[#2c3e50] mb-8 text-center leading-tight">
        <span className="bg-gradient-to-r from-[#3498db] to-[#1abc9c] text-transparent bg-clip-text">
          Change Password
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="activity w-full max-w-md space-y-4"
      >
        {/* Old Password input */}
        <div>
          <label className="block mb-2 text-blue-950 dark:text-white">
            Old Password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full`}
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/* New Password input */}
        <div>
          <label className="block mb-2 text-blue-950 dark:text-white">
            New Password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full`}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password input */}
        <div>
          <label className="block mb-2 text-blue-950 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            className={`${styles.input} w-full`}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <input
          className="w-full h-10 border border-[#37a39a] text-white bg-[#37a39a] rounded-[3px] cursor-pointer"
          type="submit"
          value="Change Password"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
