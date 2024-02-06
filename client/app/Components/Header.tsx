import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import {
  HiOutlineMenuAlt3,
  HiOutlineUserCircle,
  HiOutlineX,
} from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../Components/Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/client-2.webp";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLogOutQuery } from "../../redux/features/auth/authApi";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};
const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const { data } = useSession();
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  });
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handleClose = () => {
    setOpenSidebar(false);
  };
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    if (data === null) {
      setLogout(true);
    }
  }, [data, user]);
  console.log("userdata", user);
  return (
    <div className=" w-full relative">
      <div
        className={`${
          active
            ? "overflow:hidden dark:bg-opacity-50  bg-white  dark:bg-slate-900 dark:bg-gradient-to-b dark:from-white-100 dark:to-yellow fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 "
            : "modal-container w-full border-b bg-white dark:bg-slate-900 dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow "
        } `}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px]  flex items-center justify-between p-3 ">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-gray-500 dark:text-z`}
              >
                Elearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* //only for mobile  */}
              <div className="lg:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <>
                  <Link href={"/profile"}>
                    <Image
                      src={user.avatar ? user.avatar.url : avatar}
                      alt="hello"
                      width={30}
                      height={30}
                      className="hidden 800px:block w-[42px] h-[42px] rounded-full border-l-sky-400 border-2"
                    />
                  </Link>
                </>
              ) : (
                <HiOutlineUserCircle
                  size={35}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black  800px:item-center"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile openSidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-500 top-0 right-0">
              {/* Close icon */}
              <div className="text-right p-4">
                <HiOutlineX
                  size={30}
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>

              {/* Your sidebar content */}
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={50}
                className="align-item text-center cursor-pointer text-black dark:text-black"
                onClick={() => {
                  setOpenSidebar(true);
                }}
              />
              <br />
              <br />
              <p>Copyright @ 2023 Elearning</p>
            </div>
          </div>
        )}
        {/* The rest of your component */}
      </div>
      {route === "Login" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUp}
        />
      )}
      {route === "Verification" && open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};
export default Header;
