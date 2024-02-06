// Importing necessary modules
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import * as Yup from "yup";
import { styles } from "../../styles/styles";
import { useRegisterMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

// Type for the props
type Props = {
  setRoute: (route: string) => void;
};

// Validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

// Functional component
const SignUp: FC<Props> = ({ setRoute }) => {
  // State for password visibility
  const [show, setShow] = useState(false);

  // Destructuring the result of useRegisterMutation hook
  const [register, { isError, isSuccess, error, data }] = useRegisterMutation();

  // useEffect for handling mutation results and showing toasts
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      // Checking if "error" is present and "data" exists in it
      if (error && "data" in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData.data.message||"Email Already in DataBase");
      }
    }
  }, [isSuccess, isError, error, data, setRoute]);
  // Formik hook for handling form state and submission
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });

  // Destructuring properties from formik
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // Variants for motion animations
  const eyeIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const inputFieldVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const errorMessageVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const eyeIconColor = show ? "#4C51BF" : "#718096";

  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
    },
  };

  const stagger = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 100,
      },
    },
    hidden: { opacity: 0, y: -50 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  // JSX structure for the component
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="w-full max-w-md mx-auto mt-4 p-4  rounded-md"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.title} text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-center text-black`}
      >
        JOIN WITH ELEARNING{" "}
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-3"
        >
          <motion.input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`${
              errors.name && touched.name ? "border-red-500 " : ""
            } ${
              styles.input
            } w-full px-3 py-2 md:px-4 md:py-3 rounded-md border focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
            variants={inputFieldVariants}
          />
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.span
                className="text-red-500 block mt-1 md:mt-2"
                variants={errorMessageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors.name}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-3"
        >
          <motion.input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`${
              errors.email && touched.email ? "border-red-500 " : ""
            } ${
              styles.input
            } w-full px-3 py-2 md:px-4 md:py-3 rounded-md border focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
            variants={inputFieldVariants}
          />
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.span
                className="text-red-500 block mt-1 md:mt-2"
                variants={errorMessageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors.email}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-3 relative"
        >
          <div className="relative flex items-center">
            <motion.input
              type={!show ? "password" : "text"}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="********"
              className={`${
                errors.password && touched.password ? "border-red-500 " : ""
              } ${
                styles.input
              } w-full px-3 py-2 md:px-4 md:py-3 rounded-md border focus:outline-none focus:border-blue-500 pr-10 md:pr-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-white`}
              variants={inputFieldVariants}
            />
            <AnimatePresence>
              <motion.div
                key={show ? "visible" : "hidden"}
                variants={eyeIconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-2 md:right-4 cursor-pointer"
              >
                {show ? (
                  <AiOutlineEye
                    size={20}
                    onClick={() => setShow(false)}
                    color={eyeIconColor}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    onClick={() => setShow(true)}
                    color={eyeIconColor}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.password && touched.password && (
              <motion.span
                className="text-red-500 block mt-1 md:mt-2"
                variants={errorMessageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {errors.password}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`${styles.button} w-full`}
        >
          Sign Up
        </motion.button>
        <div className="text-center mt-3">
          {/* ... Social media icons ... */}
        </div>
        <h5 className="text-center text-black dark:text-white pt-2 font-Poppins text-xs md:text-sm">
          Already have an account ?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </form>
    </motion.div>
  );
};

export default SignUp;
