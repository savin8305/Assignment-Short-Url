"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import "./Components/Profile/styles.css"
interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="Elearning-lms"
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
      <div className="animation-container">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="circle"></div>
        ))}
        <Hero />
      </div>
    </div>
  );
};
export default Page;
