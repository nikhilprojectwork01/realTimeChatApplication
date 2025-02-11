import { CiSearch } from "react-icons/ci";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_ENDPOINT } from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setauthUser,
  setsearchName,
  setselectedUser,
} from "../redux/AuthSlice";
import store from "../redux/store";
import { useState } from "react";
export default function SideBar() {
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser } = useSelector((store) => store.auth);
  console.log(selectedUser);
  const HandleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setauthUser(null));
        navigate("/login");
        dispatch(setselectedUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  const handleInput = (e) => {
    setsearch(e.target.value);
    dispatch(setsearchName(e.target.value));
  };
  return (
    <div className="text-black p-2">
      <div className="imput-files flex p-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs bg-blue-200 placeholder:text-white"
          name="search"
          value={search}
          onChange={handleInput}
        />
        <CiSearch className="h-10 w-10 bg-gray-500 rounded-md ml-2" />
      </div>
      <div className="divider my-0 h-2"></div>
      <div className="other-user flex flex-col justify-between">
        <OtherUsers />
        <div>
          <button
            className="btn btn-neutral bg-blue-200 border-0 text-black mt-5"
            onClick={HandleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
