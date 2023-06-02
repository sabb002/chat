import { FaCheckCircle } from "react-icons/fa";

interface Props {
  avatarOptions: string[];
  selectedAvatar: string | null;
  setSelectedAvatar: (avatar: string) => void;
}

export default function AvatarCarousel({
  avatarOptions,
  selectedAvatar,
  setSelectedAvatar,
}: Props) {
  return (
    <div className="w-full flex justify-center items-center mb-10">
      <div className="flex gap-5">
        {avatarOptions.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`avatar-item relative cursor-pointer`}
              onClick={() => setSelectedAvatar(avatar)}
            >
              {selectedAvatar === avatar ? (
                <FaCheckCircle
                  size={15}
                  className="absolute right-0 bg-black text-green-400 rounded-full"
                />
              ) : (
                ""
              )}
              <img
                className={` rounded-full `}
                src={avatar}
                alt={`Avatar ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
