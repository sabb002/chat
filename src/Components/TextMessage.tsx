interface Props {
  userName: string | null;
  currentUser: string | null;
  text: string;
  selectedAvatar: string;
}

export default function TextMessage({
  userName,
  currentUser,
  text,
  selectedAvatar,
}: Props) {
  const isCurrentUser = userName === currentUser;

  const formattedText = text.replace(/\n/g, "<br/>");
  return (
    <div
      className={`mx-3 py-3 flex items-end ${
        isCurrentUser ? " flex-row-reverse " : ""
      }`}
    >
      <div className="w-[25px] h-[25px] flex flex-shrink-0 items-center justify-center m-2">
        <img className=" rounded-full" src={selectedAvatar} alt="X" />
      </div>

      <div
        className={`flex flex-col ${
          isCurrentUser ? "items-end" : " items-start"
        }`}
      >
        <div className=" text-xs text-white">{userName}</div>

        <div
          className={` max-w-[80vw] h-fit px-3 py-1  text-xs md:text-sm text-black font-semibold  rounded-br-lg rounded-bl-lg whitespace-pre-wrap break-word
          ${
            isCurrentUser
              ? "bg-blue-500 text-white rounded-tl-lg"
              : "bg-gray-200 rounded-tr-lg"
          }`}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></div>
      </div>
    </div>
  );
}
