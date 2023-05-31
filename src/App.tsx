import { useState, useEffect } from "react";
import Chatroom from "./Chatroom";
import Login from "./Login";

function App() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      {userName === "" ? (
        <Login setUserName={setUserName} />
      ) : (
        <Chatroom userName={userName} />
      )}
    </>
  );
}

export default App;
