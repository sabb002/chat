import { BsFillPersonFill } from "react-icons/bs";

interface Props {
  userName: string | null;
  text: string;
}

export default function TextMessage({ userName, text }: Props) {
  return (
    <div className="mx-3 py-3 flex justify-start items-end">
      <div className="w-[25px] h-[25px] flex items-center justify-center m-2 bg-blue-600 rounded-full">
        <BsFillPersonFill size={15} fill={"#fff"} />
      </div>

      <div className=" flex flex-col items-start">
        <div className=" px-1 text-xs text-white">{userName}</div>

        <div className="max-w-[90%] h-fit px-3 py-1 bg-gray-200 text-xs md:text-sm text-black font-semibold rounded-tr-lg rounded-br-lg rounded-bl-lg">
          {text}
        </div>
      </div>
    </div>
  );
}
