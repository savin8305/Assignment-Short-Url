"use client";
import React, { FC, useState } from "react";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import Heading from "../utils/Heading";
import AdminSidebar from "../Components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import Topbar from "../Components/Admin/sidebar/Topbar";
import { ColorModeContext, useMode } from "../Components/Admin/sidebar/theme";
import HomePage from "./HomePage";

interface Props {}

const Page: FC<Props> = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      {" "}
      <Heading
        title="Elearn-admin"
        description="Elearning is a platform for students to learn and get help from mentors"
        keywords="program mern redux ml"
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quos
      quisquam. Natus odio voluptatibus deleniti soluta beatae voluptas nemo
      officia explicabo, perferendis rem fugit omnis dolorum libero voluptates
      nostrum sequi.
      <div className="flex h-[200vh]">
        <HomePage/>
        <div className="1500px:w-[16%] w-1/5">H</div>
        <div className="w-[85%]"></div>
      </div>
    </>
  );
};

export default Page;
