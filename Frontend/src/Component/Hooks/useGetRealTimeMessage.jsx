import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setmessage } from "../../redux/messageSlice";

export default function useGetRealTimeMessage() {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.messages);
  useEffect(() => {
    socket?.on("newmessage", (newmessage) => {
      dispatch(setmessage([...messages, newmessage]));
    });
  }, [messages, setmessage]);
}
