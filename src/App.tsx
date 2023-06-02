import { useState, useEffect } from "react";
import Chatroom from "./Chatroom";
import Login from "./Login";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("selectedAvatar");
    if (storedName && storedAvatar) {
      setUserName(storedName);
      setSelectedAvatar(storedAvatar);
    }
  }, []);

  return (
    <>
      {userName !== "" && selectedAvatar !== "" ? (
        <Chatroom userName={userName} selectedAvatar={selectedAvatar} />
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
