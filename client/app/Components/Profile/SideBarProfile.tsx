import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/client-3.webp";
import {
  RiDashboard3Line,
  RiBook2Line,
  RiProfileLine,
  RiSettings3Line,
  RiLockPasswordLine,
} from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { PiCertificateFill } from "react-icons/pi";
import Link from "next/link";

interface Props {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
  name: string;
}

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
  name,
}) => {
  console.log("user-role",user.role);
  
  return (
    <div className="w-80 bg-gray-100 dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
      <div
        className={`flex items-center px-6 py-8 cursor-pointer ${
          active === 1
            ? "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
        }`}
        onClick={() => setActive(1)}
      >
        <div className="flex-shrink-0">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            alt={"profileavatar"}
            className=" border-l-sky-400 border-4 w-20 h-20 rounded-full transition duration-300 transform hover:scale-105"
            width={80}
            height={80}
          />
        </div>
        <div className="pl-4">
          <h5 className="text-xl text-gray-600 dark:text-gray-300 font-semibold">
            {name}
          </h5>
        </div>
      </div>
      {user.role === "admin" && (
        <Link href={"/admin"}>
        <MenuItem
          icon={<RiDashboard3Line size={20} />}
          text="Dashboard"
          active={active === 2}
          onClick={() => setActive(2)}
        />
        </Link>
      )}
      <MenuItem
        icon={<RiBook2Line size={20} />}
        text="My Courses"
        active={active === 3}
        onClick={() => setActive(3)}
      />
      <MenuItem
        icon={<PiCertificateFill size={20} />}
        text="Certificates"
        active={active === 4}
        onClick={() => setActive(4)}
      />
      <MenuItem
        icon={<RiProfileLine size={20} />}
        text="Profile"
        active={active === 5}
        onClick={() => setActive(5)}
      />
      <MenuItem
        icon={<RiLockPasswordLine size={20} />}
        text="Change Password"
        active={active === 6}
        onClick={() => setActive(6)}
      />
      <MenuItem
        icon={<RiSettings3Line size={20} />}
        text="Settings"
        active={active === 7}
        onClick={() => setActive(7)}
      />
      <MenuItem
        icon={<AiOutlineLogout size={20} />}
        text="Logout"
        active={active === 8}
        onClick={logOutHandler}
      />
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ icon, text, active, onClick }) => {
  return (
    <div
      className={`flex text-gray-600 items-center px-6 py-4 cursor-pointer ${
        active
          ? "bg-gray-300 dark:bg-gray-700 text-blue-900 dark:text-white"
          : "hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <h5 className="pl-4 text-lg font-semibold">{text}</h5>
    </div>
  );
};

export default SideBarProfile;
