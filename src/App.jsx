import { useContext, useEffect } from "react";
import Logger from "./Logger";
import server from "../utils/server";
import { userContext } from "./userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, setUser, id, setId } = useContext(userContext);

  //function for fetching data from backend
  const fetchdata = async () => {
    await server
      .get("/profile")
      .then((res) => {
        setUser(res.data.username);
        setId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Logger />
      <ToastContainer />
    </>
  );
}

export default App;
