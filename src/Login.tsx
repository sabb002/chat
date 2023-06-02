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

  const avatarOptions = [
    "/avatar/avatar1.png",
    "/avatar/avatar2.png",
    "/avatar/avatar3.png",
    "/avatar/avatar4.png",
    "/avatar/avatar5.png",
    "/avatar/avatar6.png",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim() !== "" && selectedAvatar) {
      setUserName(inputName.trim().toLowerCase());
      localStorage.setItem("userName", inputName);
      localStorage.setItem("selectedAvatar", selectedAvatar);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-slate-700"
      style={{
        backgroundImage: "url(/images/login.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-[min(80%,500px)] h-[400px] bg-black bg-opacity-20 backdrop-blur-md drop-shadow-md flex flex-col justify-center items-center rounded-lg"
      >
        <div className="absolute top-10 text-2xl font-bold text-gray-200">
          আমার <span className="text-green-600">চ্যাটের</span> অ্যাপ
        </div>

        <div className="mb-5 text-xs font-semibold text-gray-200">
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
          onChange={(e) => setInputName(e.target.value)}
        />
        {inputName && (
          <div className="mt-3 text-white text-xs">
            <span className="font-semibold text-md">{`${inputName}`}</span>,
            আপনাকে কি সবাই ভোদাই ডাকে?
          </div>
        )}
        <button
          type="submit"
          className=" absolute bottom-10 px-5 py-1 bg-green-700 hover:bg-white focus:bg-white text-white text-sm rounded-full hover:text-green-500 focus:text-green-600 outline-none"
        >
          {inputName ? <span>হ্যাঁ</span> : <span>হ্যালো</span>}
        </button>
      </form>
    </div>
  );
}
