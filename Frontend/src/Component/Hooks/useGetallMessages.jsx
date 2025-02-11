import axios from "axios";
import { useEffect } from "react";
import { MESSAGE_API_ENDPOINT } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setmessage } from "../../redux/messageSlice";

export default function useGetallMessages() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  const { messages } = useSelector((store) => store.messages);
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${MESSAGE_API_ENDPOINT}/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setmessage(response?.data?.conversation?.message));
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [selectedUser?._id, setmessage]);
}
