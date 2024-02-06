"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { useSelector } from "react-redux";
import { stat } from "fs";
import Profile from "../Components/Profile/Profile";
interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile`}
          description="Elearning is a platform for students to learn and earn"
          keywords="ml dsa react ts tailwind.css"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};
export default Page;
