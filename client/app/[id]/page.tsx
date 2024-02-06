"use client";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const Page: React.FC = () => {
  const urlCode = usePathname();
  const serverBaseUrl = process.env.NEXT_PUBLIC_APP_URI as string;
  const [redirected, setRedirected] = useState(false);

  const redirect = () => {
    if (urlCode && !redirected) {
      let url = `${serverBaseUrl}${urlCode}`;

      // Check if the current URL is not the same as the redirect URL
      if (window.location.href !== url) {
        setRedirected(true);
        window.location.replace(url);
      }
    }
  };

  useEffect(() => {
    redirect();
  }, [urlCode, redirected]);

  return (
    <div
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/f9/5d/76/f95d769500148e2c3698612456cf3e49.gif")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // This property ensures the image covers the entire container
      }}
      className="h-screen flex justify-center items-center bg-white dark:bg-slate-900"
    >
      <Typography variant="h3" gutterBottom style={{ margin: "3% 0% 2% 0%" }}>
        Redirecting...
      </Typography>
    </div>
  );
};

export default Page;
