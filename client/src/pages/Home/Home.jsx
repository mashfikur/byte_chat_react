import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Home = () => {
  const inputRef = useRef(null);
  const [myMessage, setMyMessage] = useState([]);
  const [message, setMessage] = useState([]);

  // message sending function
  const sendMessage = (e) => {
    e.preventDefault();
    let text = inputRef.current.value;
    let arr = [...myMessage, text];
    setMyMessage(arr);
    socket.emit("send_chat", { message: text });
    inputRef.current.value = "";
  };

  // listening to the server on any text event
  useEffect(() => {
    socket.on("recive_chat", (data) => {
      let msgArray = [...message, data.message];
      setMessage(msgArray);
    });
  }, [socket, message]);

  return (
    <div>
      <div className="min-h-screen relative">
        <h1 className="text-green-700 text-5xl font-bold text-center py-12 ">
          Welcome to Byte Chat
        </h1>

        {/* chat holder */}
        <div className="flex justify-between  border-2 max-w-screen-md mx-auto  rounded-xl min-h-[70vh] max-h-[70vh] overflow-auto p-8 gap-20">
          {/* recived message */}
          <div className="flex-1">
            <div className="flex-1 flex flex-col gap-24">
              {message
                ? message.map((item, id) => (
                    <div
                      key={id}
                      className="card min-w-full text-white bg-neutral shadow-xl"
                    >
                      <div className="card-body">
                        <p> {item} </p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          {/* my message */}
          <div className="flex-1 flex flex-col gap-4">
            {myMessage
              ? myMessage.map((item, id) => (
                  <div
                    key={id}
                    className="card min-w-full  bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <p> {item} </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>

        {/* input holder */}
        <div className="flex justify-center gap-5 absolute bottom-5 left-1/2 -translate-x-1/2">
          <form onSubmit={sendMessage} className="flex justify-center gap-5">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs focus:outline-none"
            />
            <button className="btn btn-neutral px-8">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
