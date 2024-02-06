import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AiOutlineCopy } from "react-icons/ai";

const InputForm: React.FC = () => {
  const [input, setInput] = useState({
    longUrl: "",
    urlCode: "",
  });
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const schema = Yup.object().shape({
    longUrl: Yup.string().url("Invalid URL").required("URL is required"),
    urlCode: Yup.string().matches(/^[a-zA-Z0-9_-]+$/, "Invalid code"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setIsError(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    schema
      .validate(input, { abortEarly: false })
      .then(() => {
        setIsLoading(true);
        axios
          .post("http://localhost:8000/api/url/shorten", input)
          .then((res: { status: any; data: any }) => {
            if (res.status) {
              let data = res.data;
              let createUrl = window.location.href + data.urlCode;
              setUrl(createUrl);
            }
            toast.success("URL shortened successfully!");
            setIsLoading(false);
          })
          .catch((error: { response: { data: { error: any } } }) => {
            let errorMsg = error.response.data.error;
            toast.error(errorMsg);
            setIsLoading(false);
          });
      })
      .catch((error: any) => {
        error.inner.forEach((e: any) => {
          toast.error(e.message);
        });
        setIsError(true);
      });
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 shadow-lg rounded-md">
      <label className="block text-black dark:text-white">
        Convert long URLs into shortened versions with a single click.
      </label>
      <input
        id="longUrl"
        type="url"
        value={input.longUrl}
        placeholder="Paste your long URL here"
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        className={`text-black bg-white dark:bg-gray-900 dark:text-white mt-2 w-full p-4 border rounded-md ${
          isError ? "border-red-500" : "border-gray-300"
        }`}
      />
      {isError && <span className="text-red-500">Error: URL is required.</span>}

      <input
        type="text"
        placeholder="Your personalized code"
        id="urlCode"
        value={input.urlCode}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        className="mt-2 text-black bg-white dark:bg-gray-900 w-full dark:text-white p-4 border rounded-md border-gray-300"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{ marginTop: "1rem" }}
        className={`w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>

      {url && (
        <div className="flex items-center mt-4">
          <input
            value={url}
            readOnly
            className="mr-2 bg-white dark:bg-slate-900 text-black w-full dark:text-white p-4 border rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
            placeholder="Short URL"
          />
          <div
            onClick={handleCopyClick}
            className="w-10 h-10 bg-white dark:bg-slate-900 text-black dark:text-white rounded-md cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <AiOutlineCopy size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
