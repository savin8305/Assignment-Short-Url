import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className="flex items-center py-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              active + 1 > index
                ? "bg-blue-500 dark:text-white"
                : "bg-gray-300 text-gray-600"
            } relative`}
          >
            {active + 1 > index && <IoMdCheckmark className="text-[25px]" />}
            {index !== options.length - 1 && (
              <div
                className={`absolute h-8 w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-gray-300"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${
              active === index
                ? "text-black dark:text-white"
                : "text-black dark:text-white"
            } text-[20px]`}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
