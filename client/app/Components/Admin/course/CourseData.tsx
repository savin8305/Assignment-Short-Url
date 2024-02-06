import React, { FC } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = [...benefits];
    updatedBenefits.splice(index, 1);
    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites.splice(index, 1);
    setPrerequisites(updatedPrerequisites);
  };

  const handlePrevious = () => {
    // Navigate to the previous option
    setActive(active - 1);
  };

  const handleNext = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next !");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: { title: string }, index: number) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              name="Benefit"
              placeholder="You will be able to build a full stack LMS Platform..."
              required
              className={`${styles.input} my-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            {benefits.length > 1 && (
              <IoRemoveCircleOutline
                style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                onClick={() => handleRemoveBenefit(index)}
              />
            )}
          </div>
        ))}
        <IoAddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the Prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: { title: string }, index: number) => (
          <div key={index} className="flex items-center">
            <input
              type="text"
              name="Prerequisite"
              placeholder="You will have basic knowledge of Mern..."
              required
              className={`${styles.input} my-2`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            />
            {prerequisites.length > 1 && (
              <IoRemoveCircleOutline
                style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                onClick={() => handleRemovePrerequisite(index)}
              />
            )}
          </div>
        ))}
        <IoAddCircleOutline
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={active === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={active === 3} // Assuming there are 4 options (0 to 3)
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
