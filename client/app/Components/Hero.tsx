import React, { FC, useState } from "react";
import Image from "next/image";
import CustomModalGetStarted from "../utils/CustomModalGetStarted";
import HomePage from "../shorturl/HomePage";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const stagger = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("/HomePage"); // Set the initial route properly

  return (
    <div className="dark:bg-black bg-white grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="relative z-10 flex flex-col justify-center items-center text-white text-center p-4 md:p-8">
        <h3 className="hover-2 animation-container text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-8  leading-tight text-purple-300">
          Shorten Your Links with Ease,
          <br /> Share and Save Time!{" "}
        </h3>
        <p className="text-lg sm:text-xl md:text-1xl lg:text-xl xl:text-2xl mb-6 leading-relaxed text-blue-500">
          Simplify your URLs and track their performance effortlessly.
        </p>
        <div
          className="hidden md:block cursor-pointer dark:text-white text-black md:item-center bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-md hover:bg-opacity-70 transition-all duration-300"
          onClick={() => setOpen(true)}
        >
          Get Started Now
        </div>

        {route === "/HomePage" && open && (
          <CustomModalGetStarted
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            activeItem={activeItem}
            component={HomePage}
          />
        )}

        <div
          className="flex items-center justify-center text-white text-center mb-8"
          {...stagger}
        >
          <div className="-mr-5">
            <Image
              src="/client-1.webp"
              alt="Client Image 1"
              width={50}
              height={50}
              className="rounded-full border-r-slate-400"
            />
          </div>
          <div className="-mr-5">
            <Image
              src="/client-2.webp"
              alt="Client Image 2"
              width={50}
              height={50}
              className="rounded-full border-r-slate-400"
            />
          </div>
          <div className="-mr-6">
            <Image
              src="/client-3.webp"
              alt="Client Image 3"
              width={50}
              height={50}
              className="rounded-full border-r-slate-400"
            />
          </div>
          <p className="px-8 text-lg dark:text-purple-100 text-blue-500">
            500K+ People already trusted us. Join Early
          </p>
        </div>
      </div>

      {/* Illustration */}
      <div className="mt-8 hidden md:block relative border-l-teal-50 overflow-hidden col-span-1">
        <div className="absolute inset-0 dark:bg-white mix-blend-multiply" />
        <Image
          src="/business-img.webp"
          alt="Education Illustration"
          width={600}
          height={600}
          className="dark:z-1000 h-50 w-50"
        />
      </div>
    </div>
  );
};

export default Hero;
