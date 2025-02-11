import axios from "axios";
import React, { useEffect } from "react";
import { USER_API_ENDPOINT } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setotherUser } from "../../redux/otherSlice";

export default function GetotherUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getotherUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/otheruser`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          dispatch(setotherUser(res.data.otheruser));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getotherUser();
  }, []);
}
