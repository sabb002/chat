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
  userName: string | null;
}
interface Messages {
  userName: string | any;
  text: string | any;
}

export default function Chatroom({ userName }: Props) {
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setText("");

    await addDoc(collection(db, "messages"), {
      userName,
      text,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // retrieve last 15 messages

  const getMessages = () => {
    const queryData = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(queryData, (snapshot) => {
      const updatedMessages: Messages[] = [];
      snapshot.forEach((doc) => {
        const { userName, text } = doc.data();
        updatedMessages.push({ userName, text });
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
      className=" w-[100vw] h-[100vh] overflow-x-hidden"
      style={{
        backgroundImage: "url(/images/doodle.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div>
        <div
          className="mb-[65px] pb-2 w-[min(100%,800px)] mx-auto min-h-[calc(100vh-65px)] md:bg-black md:bg-opacity-20 md:backdrop-blur-md md:drop-shadow-md"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.map((message, index) => {
            const { userName, text } = message;

            return (
              <div key={index}>
                <TextMessage
                  userName={userName}
                  currentUser={currentUser}
                  text={text}
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
