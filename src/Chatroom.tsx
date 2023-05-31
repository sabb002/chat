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

export default function Chatroom({ userName }: Props) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
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

  // retrieve last 10 messages

  const getMessages = () => {
    const queryData = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(15)
    );

    const unsubscribe = onSnapshot(queryData, (snapshot) => {
      const updatedMessages: string[] = [];
      snapshot.forEach((doc) => {
        updatedMessages.push(doc.data().text);
      });
      setMessages(updatedMessages.reverse());
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div
      className=" w-[100vw] h-[100vh] overflow-x-hidden"
      style={{
        backgroundImage: "url(/images/login.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div>
        <div className="mb-[65px] pb-2 w-[min(80%,600px)] mx-auto min-h-[calc(100vh-65px)] bg-black bg-opacity-20 backdrop-blur-md drop-shadow-md ">
          {messages.map((text, index) => {
            return (
              <div key={index}>
                <TextMessage userName={userName} text={text} />
              </div>
            );
          })}
          <div ref={containerRef}></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="input-form fixed bottom-0 px-2 py-3 bg-white
          flex w-full h-[65px] justify-center lg:justify-center"
        >
          <input
            className=" w-[min(80%,800px)] min-h-fit p-2 bg-gray-300 rounded-tl-lg rounded-bl-lg outline-none text-sm font-sans font-bold focus:bg-gray-200 "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 text-white bg-green-500 rounded-tr-lg
            rounded-br-lg"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
