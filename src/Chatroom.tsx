import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./Firebase";
import TextMessage from "./Components/TextMessage";
import Navbar from "./Components/Navbar";

interface Props {
  userName: string;
  selectedAvatar: string;
  admin: boolean;
}
interface Messages {
  userName: string | any;
  text: string | any;
  selectedAvatar: string | any;
  admin: boolean | any;
}

export default function Chatroom({ admin, userName, selectedAvatar }: Props) {
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setText("");

    if (text.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        admin,
        userName,
        text,
        selectedAvatar,
        timestamp: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  // retrieve last 50 messages

  const getMessages = () => {
    const queryData = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(queryData, (snapshot) => {
      const updatedMessages: Messages[] = [];
      snapshot.forEach((doc) => {
        const { userName, text, selectedAvatar, admin } = doc.data();
        updatedMessages.push({ userName, text, selectedAvatar, admin });
      });
      setMessages(updatedMessages.reverse());
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getMessages();
  }, []);

  //retrieve current user from localstorage

  useEffect(() => {
    const current = localStorage.getItem("userName");
    setCurrentUser(current);
  }, []);

  return (
    <div
      className="bg-[url(/images/light-chatroom.jpg)] dark:bg-[url(/images/dark-chatroom.jpg)]"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div>
        <div
          className="mb-[65px] pb-2 w-[min(95%,800px)] mx-auto min-h-[calc(100vh-65px)] bg-slate-800 bg-opacity-50 backdrop-blur-sm md:drop-shadow-lg"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message, index) => {
            const { userName, text, selectedAvatar, admin } = message;

            return (
              <div key={index}>
                <TextMessage
                  admin={admin}
                  userName={userName}
                  currentUser={currentUser}
                  text={text}
                  selectedAvatar={selectedAvatar}
                />
              </div>
            );
          })}
          <div ref={containerRef}></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="input-form fixed bottom-0 px-2 py-3 bg-white
          flex w-full h-[65px] justify-center items-center lg:justify-center"
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
      </div>
    </div>
  );
}
