import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { USER_API_ENDPOINT } from "./utils/utils";
import { useDispatch } from "react-redux";
import { setauthUser } from "../redux/AuthSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setinput] = useState({
    userName: "",
    password: "",
  });

  const handleInput = (e) => {
    return setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setauthUser(res.data.users));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-w-100 mx-auto">
      <div className="w-full p-10 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              name="userName"
              value={input.userName}
              onChange={handleInput}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-4">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="text-center my-4">
            Don't have an account? <Link to="/signup"> signup </Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
