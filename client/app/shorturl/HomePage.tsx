"use client";
import React, { FC, useState } from "react";

import { useMode } from "../Components/Admin/sidebar/theme";
import InputForm from "./InputForm";

interface Props {}

const HomePage: FC<Props> = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <div >
        <InputForm />
      </div>
    </>
  );
};

export default HomePage;
