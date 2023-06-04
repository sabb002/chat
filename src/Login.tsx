import React, { useState } from "react";

import AvatarCarousel from "./Components/AvatarCarousel";

interface Props {
  selectedAvatar: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedAvatar: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({
  setUserName,
  selectedAvatar,
  setSelectedAvatar,
}: Props) {
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [langError, setLangError] = useState(false);

  const avatarOptions = [
    "/avatar/avatar1.png",
    "/avatar/avatar2.png",
    "/avatar/avatar3.png",
    "/avatar/avatar4.png",
    "/avatar/avatar5.png",
    "/avatar/avatar6.png",
  ];
  const englishNameRegex = /^[a-zA-Z\s]*$/; // Regular Expression

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    setError(false);
    setNameError(false);
    setLangError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!englishNameRegex.test(inputName)) {
      setLangError(true);
    } else {
      if (
        inputName.toLowerCase().includes("s") &&
        inputName.toLowerCase().includes("a") &&
        inputName.toLowerCase().includes("b") &&
        inputName.toLowerCase().includes("i") &&
        inputName.toLowerCase().includes("r")
      ) {
        setNameError(true);
      } else if (
        !nameError &&
        !langError &&
        inputName.trim() !== "" &&
        selectedAvatar
      ) {
        setUserName(inputName.trim().toLowerCase());
        localStorage.setItem("userName", inputName);
        localStorage.setItem("selectedAvatar", selectedAvatar);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to left, #141e30, #243b55)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-[min(90%,600px)] h-[450px] bg-white bg-opacity-10 backdrop-blur-md drop-shadow-md flex flex-col justify-center items-center rounded-lg border-[1px] border-t-[#753a88] border-r-[#cc2b5e] border-b-[#cc2b5e] border-l-[#753a88]"
      >
        <div className="absolute flex items-center top-6 md:top-10 bg-clip-text text-transparent bg-gradient-to-tr from-[#f12711] to-[#FF6B51] ">
          <img className="w-20" src="chat.ico"></img>
          <h1 className=" px-2 text-2xl font-black">WEE-CHAT</h1>
        </div>

        <div
          className={`mb-5 text-xs font-semibold ${
            error ? "text-[#cc2b5e] animate-pulse" : "text-gray-200"
          }`}
        >
          CHOOSE AN AVATAR
        </div>

        <AvatarCarousel
          avatarOptions={avatarOptions}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />

        <input
          className=" w-[min(80%,300px)] h-8 px-3 rounded-full text-sm  font-semibold bg-white bg-opacity-20 outline-none focus:bg-white"
          type="text"
          placeholder="Enter your nickname"
          spellCheck={false}
          value={inputName}
          onChange={handleChange}
        />
        {nameError && (
          <div className=" my-3 font-bold text-sm text-red-500">
            Sorry, You are not sabbir.
          </div>
        )}
        {langError && (
          <div className=" my-3 font-bold text-sm text-red-500">
            only{" "}
            <a
              href="https://en.wikipedia.org/wiki/English_language"
              target="blank"
              className=" inline underline cursor-pointer"
            >
              English
            </a>{" "}
            letters are accepted.
          </div>
        )}
        {inputName && selectedAvatar ? (
          <button
            type="submit"
            className=" absolute bottom-10 px-5 py-1 bg-green-700 hover:bg-white hover:bg-opacity-5 text-white text-sm font-bold rounded-full hover:text-green-500 focus:text-green-600 outline-none"
          >
            GO
          </button>
        ) : null}
      </form>
    </div>
  );
}
