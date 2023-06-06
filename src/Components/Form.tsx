import { FaPaperPlane } from "react-icons/fa";
import { db } from "../Firebase";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  storedUserName: string;
  selectedAvatar: string;
  admin: boolean;
}

export default function Form({ admin, storedUserName, selectedAvatar }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setText("");

    if (text.trim() !== "") {
      const userName = storedUserName;
      await addDoc(collection(db, "messages"), {
        admin,
        userName,
        text,
        selectedAvatar,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 w-[min(96%,802px)] mx-auto z-20 px-2 py-3 bg-white dark:bg-gray-800 flex justify-center items-center shadow-md rounded "
    >
      <textarea
        rows={1}
        className=" w-[min(80%,800px)] p-2 bg-gray-300 rounded-tl-lg rounded-bl-lg outline-none text-sm font-sans font-semibold border-b-2 border-b-green-600 focus:bg-gray-200 resize-none oveflow-hidden break-words"
        spellCheck={false}
        placeholder="type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-3 py-[10px] text-white bg-green-500 rounded-tr-lg
            rounded-br-lg"
      >
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
}
