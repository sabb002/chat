import { useState, useEffect } from "react";
import Chatroom from "./Chatroom";
import Login from "./Login";

function App() {
  const [storedUserName, setStoredUserName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedAvatar = localStorage.getItem("selectedAvatar");

    if (storedName && storedAvatar) {
      setStoredUserName(storedName);
      setSelectedAvatar(storedAvatar);
    }
    if (storedName?.toLowerCase() === "sabbir") {
      setAdmin(true);
    }
  }, []);

  return (
    <>
      {storedUserName !== "" && selectedAvatar !== "" ? (
        <Chatroom
          admin={admin}
          storedUserName={storedUserName}
          selectedAvatar={selectedAvatar}
        />
      ) : (
        <Login
          selectedAvatar={selectedAvatar}
          setStoredUserName={setStoredUserName}
          setSelectedAvatar={setSelectedAvatar}
        />
      )}
    </>
  );
}

export default App;
