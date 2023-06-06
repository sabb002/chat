import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./Firebase";
import TextMessage from "./Components/TextMessage";
import Navbar from "./Components/Navbar";
import Form from "./Components/Form";

interface Props {
  storedUserName: string;
  selectedAvatar: string;
  admin: boolean;
}
interface Messages {
  userName: string | any;
  text: string | any;
  selectedAvatar: string | any;
  admin: boolean | any;
}

export default function Chatroom({
  admin,
  storedUserName,
  selectedAvatar,
}: Props) {
  const [darkMode, setDarkMode] = useState(true);
  const [messages, setMessages] = useState<Messages[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMessageSound = () => {
    audioRef.current?.play();
  };

  useEffect(() => {
    if (messages.length > 0) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  const showNotification = (sender: string, text: string) => {
    const notification = new Notification(sender, {
      body: text,
      icon: "icon.ico",
    });

    notification.onclick = () => {
      notification.close();
    };
  };

  //retrieve current user from localstorage

  useEffect(() => {
    getMessages();
    if (document.visibilityState === "visible") {
      document.title = "wee-hub";
    }
  }, []);

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

      //show notification

      if (updatedMessages.length > messages.length) {
        const newMessage = updatedMessages[updatedMessages.length - 1];
        if (document.visibilityState !== "visible") {
          if ("Notification" in window) {
            if (Notification.permission !== "granted") {
              Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                  showNotification(newMessage.userName, newMessage.text);
                }
              });
            } else {
              showNotification(newMessage.userName, newMessage.text);
            }
          }
          document.title = `New Message - ${newMessage.userName}`;
        }

        if (newMessage?.userName !== storedUserName) {
          console.log(newMessage.userName + " !== " + storedUserName);

          playMessageSound();
        }
      }
    });

    return () => unsubscribe();
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <audio ref={audioRef} src="/sound/message.mp3"></audio>
      <div
        className="fixed inset-0 z-[-1] bg-[url(/images/light-chatroom.jpg)] dark:bg-[url(/images/dark-chatroom.jpg)]"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div
        className=" mx-auto pt-[110px] pb-2 w-[min(95%,800px)] min-h-screen bg-slate-800 bg-opacity-40 backdrop-blur-sm"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message, index) => {
          const { userName, text, selectedAvatar, admin } = message;
          const isCurrentUser = userName === storedUserName;

          return (
            <div key={index}>
              <TextMessage
                admin={admin}
                userName={userName}
                isCurrentUser={isCurrentUser}
                text={text}
                selectedAvatar={selectedAvatar}
              />
            </div>
          );
        })}
        <div ref={containerRef}></div>
      </div>

      <div className="pt-[60px]"></div>
      <Form
        admin={admin}
        storedUserName={storedUserName}
        selectedAvatar={selectedAvatar}
      />
    </div>
  );
}
