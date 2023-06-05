import { useState } from "react";
import Emoji from "./Emoji";

interface Props {
  admin: boolean;
  userName: string;
  text: string;
  selectedAvatar: string;
  isCurrentUser: boolean;
}

export default function TextMessage({
  admin,
  userName,
  text,
  selectedAvatar,
  isCurrentUser,
}: Props) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const formattedText = text.replace(/\n/g, "<br/>");

  return (
    <div
      className={`mx-3 py-2 flex items-end ${
        isCurrentUser ? " flex-row-reverse " : "flex-row"
      }`}
    >
      <div className="w-[25px] h-[25px] flex flex-shrink-0 items-center justify-center m-2">
        <img className=" rounded-full" src={selectedAvatar} alt="x" />
      </div>

      <div
        className={` relative flex flex-col ${
          isCurrentUser ? "items-end" : " items-start"
        }`}
      >
        <div className=" text-[10px] text-white">{userName}</div>

        {admin ? (
          <div
            className={
              " max-w-[80vw] h-fit px-3 py-1 bg-slate-600 text-white rounded-full whitespace-pre-wrap break-word text-xs dark:py-0 dark:text-sm dark:font-bold dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-l dark:from-[#DC2424] dark:to-[#FF8008]"
            }
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></div>
        ) : (
          <div
            className={`max-w-[80vw] h-fit px-3 py-1 text-xs rounded-br-lg rounded-bl-lg whitespace-pre-wrap break-word font-semibold ${
              isCurrentUser
                ? "bg-blue-500 text-white rounded-tl-lg"
                : "bg-gray-200 text-black rounded-tr-lg"
            }`}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></div>
        )}
        {selectedEmoji && (
          <div
            className={`absolute text-xs cursor-pointer ${
              isCurrentUser
                ? "bottom-[-5px] left-[-5px]"
                : "bottom-[-5px] right-[-5px]"
            }`}
          >
            {selectedEmoji}
          </div>
        )}
      </div>
      <Emoji setSelectedEmoji={setSelectedEmoji} />
    </div>
  );
}
