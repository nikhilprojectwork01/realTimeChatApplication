/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import Login from "./Component/Login";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { io } from "socket.io-client";
import { setsocket } from "./redux/socketSlice";
import { setonlineUsers } from "./redux/AuthSlice";
const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);
export default function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.auth);
  console.log(authUser);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setsocket(socket));

      socket.on("getOnlineUsers", (onlineUser) => {
        dispatch(setonlineUsers(onlineUser));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setsocket(null));
      }
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 flex items-center h-screen justify-center">
      <RouterProvider router={approuter} />
    </div>
  );
}
