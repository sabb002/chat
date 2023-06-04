import { useState, useEffect } from "react";
import Chatroom from "./Chatroom";
import Login from "./Login";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("selectedAvatar");

    if (storedName && storedAvatar) {
      setUserName(storedName);
      setSelectedAvatar(storedAvatar);
    }
    if (storedName?.toLowerCase() === "sabbir") {
      setAdmin(true);
    }
  }, []);

  return (
    <>
      {userName !== "" && selectedAvatar !== "" ? (
        <Chatroom
          admin={admin}
          userName={userName}
          selectedAvatar={selectedAvatar}
        />
      ) : (
        <Login
          selectedAvatar={selectedAvatar}
          setUserName={setUserName}
          setSelectedAvatar={setSelectedAvatar}
        />
      )}
    </>
  );
}

export default App;
