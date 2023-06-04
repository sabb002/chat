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
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

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
      if (document.visibilityState !== "visible") {
        if (updatedMessages.length > messages.length) {
          const newMessage = updatedMessages[updatedMessages.length - 1];
          if ("Notification" in window) {
            Notification?.requestPermission().then((permission) => {
              if (permission === "granted") {
                showNotification(newMessage.userName, newMessage.text);
              }
            });
          }
          document.title = `New Message (${newMessage.userName})`;
        }
      }
      if (document.visibilityState === "visible") {
        document.title = "wee-hub";
      }
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
    <div className={`${darkMode && "dark"}`}>
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
        className="mx-auto pt-[60px] pb-2 w-[min(95%,800px)] min-h-screen bg-slate-800 bg-opacity-40 backdrop-blur-sm"
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
      <div className="pt-[60px]"></div>
      <Form admin={admin} userName={userName} selectedAvatar={selectedAvatar} />
    </div>
  );
}
