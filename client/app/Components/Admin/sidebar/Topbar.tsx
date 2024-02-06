import React, { useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
// ... (imports)

const Topbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-end p-6 fixed  right-0">
      <ThemeSwitcher />

      <div
        className="relative cursor-pointer m-2 transition-transform transform hover:scale-105 bg-gray-200 dark:bg-gray-800 rounded-lg p-2"
        onClick={() => setOpen(!open)}
      >
        <NotificationsOutlinedIcon className="text-3xl cursor-pointer dark:text-white text-black" />

        <span className="absolute top-2 right-2 bg-green-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white shadow-md">
          3
        </span>

        {open && (
          <div className="w-80 max-w-screen-md h-auto  absolute top-16 right-2 z-10 rounded-lg text-center text-base font-Poppins text-black dark:text-white p-4 overflow-hidden transform transition-transform scale-100">
            {/* Notifications content */}
            <div className="dark:bg-gray-800 bg-gray-100 font-Poppins border-b dark:border-b-gray-700 border-b-gray-300 rounded-t-lg overflow-hidden">
              <div className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-t-lg">
                <p className="text-xl font-extrabold">New Question Received</p>
                <button className="cursor-pointer text-sm underline transition transform hover:scale-105">
                  Mark as read
                </button>
              </div>

              <p className="px-4 text-sm text-gray-700 dark:text-white leading-6 mt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Deserunt, sequi! Tempore libero omnis et, ea beatae ut, itaque.
              </p>

              <div className="p-4 flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                    JD
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-white transition transform hover:underline">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Product Manager
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-800 dark:text-white opacity-70">
                  5 days ago
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
