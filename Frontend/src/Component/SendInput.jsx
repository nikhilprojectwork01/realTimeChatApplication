import { useState } from "react";
import { IoSend } from "react-icons/io5";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { MESSAGE_API_ENDPOINT } from "./utils/utils";
import toast from "react-hot-toast";
import { setmessage } from "../redux/messageSlice";
export default function SendInput() {
  const dispatch = useDispatch();
  const [message, setInput] = useState("");
  const { selectedUser } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.messages);
  const handleFuntion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${MESSAGE_API_ENDPOINT}/send/${selectedUser._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(setmessage([...messages, res?.data?.newMessage]));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setInput("");
  };

  return (
    <>
      <form onSubmit={handleFuntion}>
        <div className="message-div rounded-xl m-2 h-10 relative bg-gray-700 flex items-center justify-around">
          <input
            type="text"
            placeholder="Enter Your Message"
            name="message"
            value={message}
            className="h-full w-126 rounded-xl bg-gray-700 border-0 outline-0"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            {message.length == 0 ? null : (
              <IoSend className="h-6 w-6 cursor-pointer" />
            )}
          </button>
        </div>
      </form>
    </>
  );
}
