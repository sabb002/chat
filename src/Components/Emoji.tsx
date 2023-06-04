import { useState } from "react";
import { MdAddReaction } from "react-icons/md";

interface Props {
  setSelectedEmoji: React.Dispatch<React.SetStateAction<string>>;
}

export default function Emoji({ setSelectedEmoji }: Props) {
  const [emojiOn, setEmojiOn] = useState<boolean>(false);

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    setEmojiOn(false);
  };

  return (
    <>
      <div
        className="mx-4 text-gray-300 dark:text-gray-600 cursor-pointer"
        onClick={() => setEmojiOn(!emojiOn)}
      >
        <MdAddReaction size={15} />
      </div>

      {emojiOn && (
        <div className="flex cursor-pointer">
          <div className="emoji" onClick={() => handleEmojiClick("❤")}>
            ❤
          </div>
          <div className="emoji" onClick={() => handleEmojiClick("😆")}>
            😆
          </div>
          <div className="emoji" onClick={() => handleEmojiClick("😢")}>
            😢
          </div>
          <div className="emoji" onClick={() => handleEmojiClick("😮")}>
            😮
          </div>
          <div className="emoji" onClick={() => handleEmojiClick("😠")}>
            😠
          </div>
        </div>
      )}
    </>
  );
}
