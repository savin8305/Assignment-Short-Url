"use client";
import CreateCourse from "@/app/Components/Admin/course/CreateCourse";
import Sidebar from "@/app/Components/Admin/sidebar/AdminSidebar";
import Topbar from "@/app/Components/Admin/sidebar/Topbar";
import Heading from "@/app/utils/Heading";
import React, { FC, useState } from "react";

interface Props {}

const Page: FC<Props> = () => {


  return (
    <div className="">
      <Heading
        title="Elearn-admin"
        description="Elearning is a platform for students to learn and get help from mentors"
        keywords="program mern redux ml"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
            <Sidebar/>
        </div>
        <div className="w-[85%]">
            <Topbar/>
            <CreateCourse/>
        </div>
      </div>
    </div>
  );
};

export default Page;
