import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login({ setUserName }: Props) {
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim() !== "") {
      setUserName(inputName.trim());
      localStorage.setItem("userName", inputName);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center dark:bg-slate-700"
      style={{
        backgroundImage: "url(/images/login.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[min(80%,500px)] h-[400px] bg-black bg-opacity-20 backdrop-blur-md drop-shadow-md flex  justify-center items-center rounded-lg"
      >
        <input
          className=" w-[50%] h-8 px-3 rounded-full text-sm  font-semibold bg-white bg-opacity-20 outline-none focus:bg-white"
          type="text"
          placeholder="Enter your nickname"
          spellCheck={false}
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button
          type="submit"
          className=" px-2 py-1  dark:text-white hover:text-green-500"
        >
          <FaArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}
