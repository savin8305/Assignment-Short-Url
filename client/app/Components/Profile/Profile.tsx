"use client";
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import "./styles.css";
import CertificatePage from "./CertiFicate";
interface Props {
  user: any;
}

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [name, setName] = useState(user.name);
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  });
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };
  return (
    <div className=" bg-white w-full dark:bg-slate-900 flex ma-auto">
      <div
        className={`fade-in-right dark:bg-slate-900 bg-opacity-90 rounded-[5px]  mt-[40px] mb-[80px] sticky
     ${scroll ? "top-[110px]" : "top-[30px]"} left-[50px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
          name={name}
        />
        <br />
        <br />
      </div>
      {active === 1 && (
        <div className="fade-in-right animation-container w-full h-full bg-transparent mt-[80px]">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="circle"></div>
          ))}
          <ProfileInfo
            avatar={avatar}
            user={user}
            name={name}
            setName={setName}
          />
        </div>
      )}
      {active === 4 && (
        <div className="fade-in-right animation-container w-full h-full bg-transparent mt-[80px]">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="circle"></div>
          ))}
          <CertificatePage userName={name} courseName={"DSA"} />
        </div>
      )}
      {active === 6 && (
        <div className="fade-in-right animation-container w-full h-full bg-transparent mt-[80px]">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="circle"></div>
          ))}
          <ChangePassword />
        </div>
      )}
    </div>
  );
};
export default Profile;
