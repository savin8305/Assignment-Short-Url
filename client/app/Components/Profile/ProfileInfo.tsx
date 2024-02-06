import Image from "next/image";
import { styles } from "../../styles/styles";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/e14cdba99c88a55fa7e7590397743cda.jpg";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
  name:string;
  setName:any;
};

const ProfileInfo: FC<Props> = ({ avatar, user ,name ,setName }) => {
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };
  useEffect(() => {
    setName(user && user.name);
  }, [user.name]);

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Your information Updated");
    }
    if (isSuccess) {
      toast.success("Your avatar Updated Successfully");
    }
  }, [isSuccess, error, success, updateError]);
  return (
    <div className="animation-container flex flex-col items-center">
      <div className=" relative mb-4">
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
          alt="user"
          width={120}
          height={120}
          className="activity w-32 h-32 object-cover rounded-full border-4 border-[#37a39a]"
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <label htmlFor="avatar" className="absolute bottom-2 right-2">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>

      <form
        onSubmit={handleSubmit}
        className="activity w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-2 text-blue-950">Full Name</label>
          <input
            type="text"
            className={`${styles.input} w-full`}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-blue-950">Email Address</label>
          <input
            type="text"
            readOnly
            className={`${styles.input} w-full`}
            required
            value={user?.email}
          />
        </div>

        <input
          className="w-full h-10 border border-[#37a39a] text-white bg-[#37a39a] rounded-[3px] cursor-pointer"
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default ProfileInfo;
