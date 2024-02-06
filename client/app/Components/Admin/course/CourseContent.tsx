// // Importing React and necessary icons
// import React, { FC, useState } from "react";
// import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { BsLink45Deg, BsPencil } from "react-icons/bs";
// import { styles } from "@/app/styles/styles"; // Adjust the path based on your project structure
// import toast from "react-hot-toast";

// // Defining props for CourseContent component
// type Props = {
//   active: number;
//   setActive: (active: number) => void;
//   courseContentData: any;
//   setCourseContentData: (courseContentData: any[]) => void;
//   handleCourseSubmit: () => void;
// };

// // CourseContent component
// const CourseContent: FC<Props> = ({
//   courseContentData,
//   setCourseContentData,
//   active,
//   setActive,
//   handleCourseSubmit,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     Array(courseContentData.length).fill(false)
//   );

//   const handleAddLink = (index: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.push({ title: "", url: "" });
//     setCourseContentData(updatedData);
//   };

//   const handleCollapseToggle = (index: number) => {
//     setIsCollapsed((prev) => {
//       const updatedCollapseState = [...prev];
//       updatedCollapseState[index] = !updatedCollapseState[index];
//       return updatedCollapseState;
//     });
//   };

//   const handleRemovalLink = (index: number, linkIndex: number) => {
//     const updatedData = [...courseContentData];
//     updatedData[index].links.splice(linkIndex, 1);
//     setCourseContentData(updatedData);
//   };

//   const newContentHandler = (item: any) => {
//     if (
//       item.title === "" ||
//       item.description === "" ||
//       item.videoUrl === "" ||
//       item.links[0].title === "" ||
//       item.links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first");
//     } else {
//       const newContent = {
//         videoSection: `Untitled Section ${active + 1}`,
//         title: "New Title",
//         videoUrl: "",
//         description: "",
//         links: [{ title: "", url: "" }],
//       };

//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const [activeSection, setActiveSection] = useState(1);

//   const addNewSection = () => {
//     const lastSection = courseContentData[courseContentData.length - 1];

//     if (
//       lastSection.title === "" ||
//       lastSection.description === "" ||
//       lastSection.videoUrl === "" ||
//       lastSection.links[0].title === "" ||
//       lastSection.links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first!");
//     } else {
//       setActiveSection(activeSection + 1);
//       const newContent = {
//         videoSection: `Untitled Section ${activeSection}`,
//         title: "New Title",
//         videoUrl: "",
//         description: "",
//         links: [{ title: "", url: "" }],
//       };
//       setCourseContentData([...courseContentData, newContent]);
//     }
//   };

//   const handlePrevious = () => {
//     setActive(active - 1);
//   };

//   const handleNext = () => {
//     const lastSection = courseContentData[courseContentData.length - 1];

//     if (
//       lastSection.title === "" ||
//       lastSection.description === "" ||
//       lastSection.videoUrl === "" ||
//       lastSection.links[0].title === "" ||
//       lastSection.links[0].url === ""
//     ) {
//       toast.error("Please fill all the fields first!");
//     } else {
//       setActive(active + 1);
//       setTimeout(() => {
//         handleCourseSubmit();
//       });
//     }
//   };

//   return (
//     <div className="w-[80%] m-auto mt-24 p-3">
//       <form onSubmit={handleCourseSubmit}>
//         {courseContentData.map((item: any, index: number) => (
//           <div
//             key={index}
//             className={`w-full bg-[#cdc8c817] p-4 ${
//               index === 0 ||
//               item.videoSection !== courseContentData[index - 1].videoSection
//                 ? "mt-18"
//                 : "mb-0"
//             }`}
//           >
//             {index === 0 ||
//             item.videoSection !== courseContentData[index - 1].videoSection ? (
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   className={`text-[20px] ${
//                     item.videoSection === "Untitled Section"
//                       ? "w-[170px]"
//                       : "w-min"
//                   } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
//                   value={item.videoSection}
//                   onChange={(e) => {
//                     const updatedData = [...courseContentData];
//                     updatedData[index].videoSection = e.target.value;
//                     setCourseContentData(updatedData);
//                   }}
//                 />
//                 <BsPencil className="ml-2 cursor-pointer dark:text-white text-black" />
//               </div>
//             ) : null}

//             <div className="flex w-full items-center justify-between my-0">
//               {isCollapsed[index] ? (
//                 item.title && (
//                   <p className="font-Poppins dark:text-white text-black">
//                     {index + 1}. {item.title}
//                   </p>
//                 )
//               ) : (
//                 <div></div>
//               )}
//               <div className="flex items-center">
//                 <AiOutlineDelete
//                   className={`dark:text-white text-[20px] mr-2 ☐ text-black ${
//                     index > 0 ? "cursor-pointer" : "cursor-no-drop"
//                   }`}
//                   onClick={() => {
//                     if (index > 0) {
//                       const updatedData = [...courseContentData];
//                       updatedData.splice(index, 1);
//                       setCourseContentData(updatedData);
//                     }
//                   }}
//                 />
//                 <MdOutlineKeyboardArrowDown
//                   fontSize="large"
//                   className="dark:text-white ☐ text-black"
//                   style={{
//                     transform: isCollapsed[index]
//                       ? "rotate(180deg)"
//                       : "rotate(0deg)",
//                   }}
//                   onClick={() => handleCollapseToggle(index)}
//                 />
//               </div>
//             </div>

//             {!isCollapsed[index] ? (
//               <>
//                 <div className="my-3">
//                   <label className={styles.label}>Video Title</label>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       placeholder="Project Plan..."
//                       className={`${styles.input}`}
//                       value={item.title}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index].title = e.target.value;
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className={styles.label}>Video Url</label>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       placeholder="sdder"
//                       className={`${styles.input}`}
//                       value={item.videoUrl}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index].videoUrl = e.target.value;
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className={styles.label}>Description</label>
//                   <textarea
//                     rows={10}
//                     cols={30}
//                     placeholder="Enter description..."
//                     className={`${styles.input} h-min`}
//                     value={item.description}
//                     onChange={(e) => {
//                       const updatedData = [...courseContentData];
//                       updatedData[index].description = e.target.value;
//                       setCourseContentData(updatedData);
//                     }}
//                   />
//                 </div>

//                 {item?.links.map((link: any, linkIndex: number) => (
//                   <div className="mb-3 block" key={linkIndex}>
//                     <div className="w-full flex items-center justify-between">
//                       <label className={styles.label}>
//                         Link {linkIndex + 1}
//                       </label>
//                       <AiOutlineDelete
//                         className={`${
//                           linkIndex === 0
//                             ? "cursor-no-drop"
//                             : "cursor-pointer"
//                         } text-black dark:text-white text-[20px]`}
//                         onClick={() =>
//                           linkIndex === 0
//                             ? null
//                             : handleRemovalLink(index, linkIndex)
//                         }
//                       />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Source Code... (Link title)"
//                       className={`${styles.input}`}
//                       value={link.title}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index].links[linkIndex].title =
//                           e.target.value;
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                     <input
//                       type="url"
//                       placeholder="Source Code Url... (Link URL)"
//                       className={`${styles.input} mt-6`}
//                       value={link.url}
//                       onChange={(e) => {
//                         const updatedData = [...courseContentData];
//                         updatedData[index].links[linkIndex].url =
//                           e.target.value;
//                         setCourseContentData(updatedData);
//                       }}
//                     />
//                   </div>
//                 ))}

//                 <div
//                   className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//                   onClick={() => handleAddLink(index)}
//                 >
//                   <BsLink45Deg /> Add Link
//                 </div>
//               </>
//             ) : null}
//           </div>
//         ))}
//         <div
//           className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//           onClick={() => newContentHandler(courseContentData[0])}
//         >
//           <AiOutlinePlusCircle className="mr-2" /> Add New Content
//         </div>
//         <br />
//         <div
//           className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
//           onClick={() => addNewSection()}
//         >
//           <AiOutlinePlusCircle className="mr-2" /> Add new Section
//         </div>
//         <br />
//       </form>
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={handlePrevious}
//           disabled={active === 0}
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={active === 3}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseContent;
// Importing React and necessary icons
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { styles } from "@/app/styles/styles"; // Adjust the path based on your project structure
import toast from "react-hot-toast";

// Defining props for CourseContent component
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any[]) => void;
  handleCourseSubmit: () => void;
};

// CourseContent component
const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapseState = [...isCollapsed];
    updatedCollapseState[index] = !updatedCollapseState[index];
    setIsCollapsed(updatedCollapseState);
  };

  const handleRemovalLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoSection: newVideoSection,
        title: "New Title",
        videoUrl: "",
        description: "",
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const [activeSection, setActiveSection] = useState(1);

  const addNewSection = () => {
    const lastSection = courseContentData[courseContentData.length - 1];

    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoSection: `Untitled Section ${activeSection}`,
        title: "New Title",
        videoUrl: "",
        description: "",
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handlePrevious = () => {
    setActive(active - 1);
  };

  const handleNext = () => {
    const lastSection = courseContentData[courseContentData.length - 1];

    if (
      lastSection.title === "" ||
      lastSection.description === "" ||
      lastSection.videoUrl === "" ||
      lastSection.links[0].title === "" ||
      lastSection.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActive(active + 1);
      setTimeout(() => {
        handleCourseSubmit();
      });
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleCourseSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "mt-10" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <div className="flex items-center">
                  <input
                    type="text"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BsPencil className="ml-2 cursor-pointer dark:text-white text-black" />
                </div>
              )}
              <div className="flex w-full items-center justify-between my-0">
                {isCollapsed[index] ? (
                  item.title && (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  )
                ) : (
                  <div></div>
                )}
                {/* arrow button */}
                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-[20px] mr-2 ☐ text-black ${
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <MdOutlineKeyboardArrowDown
                    fontSize="large"
                    className="dark:text-white ☐ text-black"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] ? (
                <>
                  <div className="my-3">
                    <label className={styles.label}>Video Title</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Video Url</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className={styles.label}>Description</label>
                    <textarea
                      rows={10}
                      cols={30}
                      placeholder="Enter description..."
                      className={`${styles.input} h-min`}
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between">
                        <label className={styles.label}>
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemovalLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source Code... (Link title)"
                        className={`${styles.input}`}
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="url"
                        placeholder="Source Code Url... (Link URL)"
                        className={`${styles.input} mt-6`}
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  <div
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={() => handleAddLink(index)}
                  >
                    <BsLink45Deg /> Add Link
                  </div>
                </>
              ) : (
                <div></div>
              )}
              <br />
              <div
                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                onClick={(e: any) => newContentHandler(item)}
              >
                <AiOutlinePlusCircle className="mr-2" /> Add New Content
              </div>
              <br />
              <div
                className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                onClick={() => addNewSection()}
              >
                <AiOutlinePlusCircle className="mr-2" /> Add new Section
              </div>
            </div>
          );
        })}
      </form>
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
          disabled={active === 3}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
