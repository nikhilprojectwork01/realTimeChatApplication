/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setselectedUser } from "../redux/AuthSlice";
import store from "../redux/store";
import { useEffect, useState } from "react";

export default function OtherUser({ info }) {
  const { onlineUsers } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isOnline = onlineUsers.includes(info._id);
  const handleSelectedUser = (info) => {
    dispatch(setselectedUser(info));
  };
  const { selectedUser } = useSelector((store) => store.auth);
  return (
    <>
      <div
        onClick={() => handleSelectedUser(info)}
        className={`${
          selectedUser?._id === info?._id
            ? "bg-zinc-200 text-black"
            : "text-white"
        } flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <div>
          <div
            className={` ${
              isOnline
                ? "h-2 w-2 rounded-4xl relative top-2 left-7 bg-green-600"
                : null
            }`}
          ></div>
          <div className=" h-10 w-10 rounded-3xl">
            <img
              className="h-full w-full rounded-3xl"
              src={info?.profilePhoto}
              alt="image"
            />
          </div>
        </div>
        <div className="ml-2">
          <p>{info?.userName}</p>
        </div>
      </div>
      <div className="divider my-0 h-1 py-0"></div>
    </>
  );
}
