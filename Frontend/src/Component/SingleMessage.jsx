/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";

export default function SingleMessage({ info }) {
  const scroll = useRef();
  const { authUser } = useSelector((store) => store.auth);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [info]);
  const { selectedUser } = useSelector((store) => store.auth);
  return (
    <div>
      <div
        ref={scroll}
        className={`chat ${
          info?.senderId === authUser?._id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                info?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{info?.createdAt}</time>
        </div>
        <div
          className={`chat-bubble ${
            info?.senderId !== authUser?._id ? "bg-gray-200 text-black" : ""
          } `}
        >
          {info?.message}
        </div>
      </div>
    </div>
  );
}
