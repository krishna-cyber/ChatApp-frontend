import { useContext } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { userContext } from "./userContext";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
const Logger = () => {
  const { user, id } = useContext(userContext);

  if (user && id) {
    return <Chat />;
  }

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />
      </Routes>
    </div>
  );
};

export default Logger;
