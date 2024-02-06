import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import * as Yup from "yup";
import { styles } from "../../styles/styles";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, isError, error, data }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login Successful";
      toast.success(message);
      setOpen(false);
    }
    if (error) {
      const errorData = error as any;
      console.log(errorData);
      const errorMessage = errorData?.data?.message || "Invalid user information";
      toast.error(errorMessage);
    }
  }, [isSuccess, isError, error, data, setRoute]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="w-full max-w-md mx-auto p-4 mt-10 rounded-md"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.title} text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-center text-black`}
      >
        WELCOME BACK
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            } w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500`}
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
              } w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500 pr-10`}
              variants={inputFieldVariants}
            />
            <AnimatePresence>
              <motion.div
                key={show ? "visible" : "hidden"}
                variants={eyeIconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-2 cursor-pointer"
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
          className={`${styles.buttonIcon} w-full`}
        >
          Sign In
        </motion.button>
        <div className="text-center mt-3">
          <h5 className="text-xs md:text-sm font-Poppins text-gray-500">
            Or sign in with
          </h5>
          <div className="flex item-center justify-center mt-2">
            <FcGoogle
              size={40}
              className={`${styles.buttonIcon} text-black cursor-pointer mr-1 transform hover:scale-110`}
              onClick={() => signIn("google")}
            />
            <AiFillGithub
              size={40}
              className={`${styles.buttonIcon} text-black cursor-pointer ml-2 transform hover:scale-110`}
              onClick={() => signIn("github")}
            />
          </div>
        </div>
        <h5 className="text-center text-black pt-2 font-Poppins text-xs md:text-sm">
          Don't have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
      <br />
    </motion.div>
  );
};

export default Login;
