"use client";
import React, { FC, useState } from "react";
import { ThemeProvider, CssBaseline, Grid } from "@mui/material";
import Heading from "../utils/Heading";
import AdminSidebar from "../Components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import Topbar from "../Components/Admin/sidebar/Topbar";
import { ColorModeContext, useMode } from "../Components/Admin/sidebar/theme";
import Dashboard from "../Components/Admin/sidebar/DashboardHero";

interface Props {}

const Page: FC<Props> = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <AdminProtected>
      <Heading
        title="Elearn-admin"
        description="Elearning is a platform for students to learn and get help from mentors"
        keywords="program mern redux ml"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar/>
        </div>
        <div className="w-[85%]">
          <Topbar/>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
