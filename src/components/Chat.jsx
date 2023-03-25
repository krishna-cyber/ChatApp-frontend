import { useForm } from "react-hook-form";
import { useEffect, useState, useContext, useRef } from "react";
import Avatar from "./Avatar";
import { userContext } from "../userContext";
import server from "../../utils/server";
import { uniqBy } from "lodash";
import { Link } from "react-router-dom";

const Chat = () => {
  const [ws, setws] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [messages, setMessages] = useState([]);
  const divundermessages = useRef();

  const { id, user, setUser, setId } = useContext(userContext);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      setws(socket);
    };
    //execute only when refresh state changes

    socket.addEventListener("message", handlemessage);

    return () => {
      socket.close();
    };
  }, [user, id]);

  useEffect(() => {
    if (selectedUser) {
      console.log(selectedUser);
      console.log(id);
      server
        .post(`/messages`, {
          sender: id,
          receiver: selectedUser,
        })
        .then((res) => {
          setMessages(res.data);
        });
    }
  }, [selectedUser]);

  const handlelogout = () => {
    server.get("/logout").then((res) => {
      setUser(null);
      setId(null);
    });
  };

  const handlemessage = (e) => {
    //parse json to object
    const data = JSON.parse(e.data);

    //if online property is present
    if (data.online) {
      showOnlineUsers(data.online);
    }
    //if message property is present
    if (data.message) {
      //if message is for current user
      if (data.message.receiver === id) {
        data.message._id = Date.now();
        //add message to messages array
        setMessages((prev) => uniqBy([...prev, data.message], "_id"));
      }
    }
  };

  const showOnlineUsers = (onlineUsers) => {
    let obj = Object.assign(
      {},
      ...onlineUsers.map((person) => ({ [person.id]: person.username }))
    );
    //remove current user from online users
    delete obj[id];
    setOnlineUsers(obj);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onsubmit = (data) => {
    //send message to server
    ws.send(
      JSON.stringify({
        message: data.message,
        to: selectedUser,
        from: id,
      })
    );
    //clear input field
    setMessages((prev) => [
      ...prev,
      {
        message: data.message,
        receiver: selectedUser,
        sender: id,
        _id: Date.now(),
      },
    ]);
    setValue("message", "");
  };
  useEffect(() => {
    const div = divundermessages.current;
    if (div) {
      div.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <section className=' h-screen flex'>
      <div className=' w-1/3 flex flex-col bg-blue-100 '>
        <div className='flex gap-2 font-bold text-3xl text-blue-600 items-center p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='w-8 h-8'>
            <path d='M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z' />
            <path d='M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z' />
          </svg>

          <span>ChatApp</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-6 h-6 ml-auto cursor-pointer active:rotate-90'
            onClick={() => setrefresh(true)}>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </div>
        <div className=' h-[71%] flex flex-col gap-2'>
          {Object.keys(onlineUsers).map((key) => (
            <div
              key={key}
              onClick={() => setSelectedUser(key)}
              className={
                "flex gap-3 items-center px-10 py-4 cursor-pointer font-semibold text-2xl capitalize  " +
                (selectedUser === key
                  ? "bg-blue-50 border-blue-400 border-l-[6px]"
                  : "")
              }>
              <Avatar />
              {onlineUsers[key]}
            </div>
          ))}
        </div>
        <div
          className=' w-[75%] mx-auto rounded-md p-8
         bg-blue-200 self-end flex items-center gap-3 '>
          <Avatar />
          <p className=' text-lime-800 text-lg font-semibold'>{user}</p>
          <Link
            to='/Login'
            onClick={() => {
              handlelogout();
            }}
            className=' text-lime-800 p-2 bg-blue-300 w-fit rounded-md ml-auto hover:bg-blue-400 hover:text-lime-400'>
            Logout{" "}
          </Link>
        </div>
      </div>
      <div className=' w-2/3 bg-blue-50 flex p-4 flex-col'>
        <div className=' flex-grow flex flex-col overflow-y-scroll scrollbar'>
          {!selectedUser && (
            <div className=' flex items-center justify-center h-full'>
              <span className=' text-2xl font-semibold text-slate-400'>
                ⬅️ Please select your loved one to start chatting
              </span>
            </div>
          )}
          {!!selectedUser &&
            messages.map((message, index) => (
              <div
                className={
                  "p-4 mb-3 rounded-md max-w-[50%]" +
                  (message.sender == id
                    ? " bg-blue-500 self-end text-white"
                    : " bg-blue-200 text-blue-700 self-start")
                }>
                {message.message}
              </div>
            ))}
          <div ref={divundermessages}></div>
        </div>
        {selectedUser && (
          <form
            className=' flex gap-2 items-center'
            onSubmit={handleSubmit(onsubmit)}>
            <input
              {...register("message", { required: true })}
              type='text'
              className=' p-2 border-2 rounded flex-grow'
              placeholder='Enter your message here...'
            />
            <button
              type='submit'
              className=' bg-blue-500 p-2 rounded text-white hover:bg-blue-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                class='w-6 h-6'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Chat;
