import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <>
      {(isLoggedIn || token) && <Dashboard />}
      {!isLoggedIn && !token && <Login setIsLoggedIn={setIsLoggedIn} />}
    </>
  );
}

export default App;
