import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const Home = () => {
  const inputRef = useRef(null);

  // message sending function
  const sendMessage = (e) => {
    e.preventDefault();
    let text = inputRef.current.value;
    socket.emit("send_chat", { message: text });
    inputRef.current.value = "";
  };

  // listening to the server on any text event
  useEffect(() => {
    socket.on("recive_chat", (data) => {
      alert(data.message);
    });
  }, [socket]);

  return (
    <div>
      <div>
        <h1 className="text-green-700 text-5xl font-bold text-center py-12 ">
          Welcome to Byte Chat
        </h1>

        {/* input holder */}
        <div className="flex justify-center gap-5">
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
