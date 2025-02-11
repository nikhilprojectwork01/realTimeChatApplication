import { useSelector } from "react-redux";
import MessageContainer from "./MessageContainer";
import SideBar from "./sidebar";
import store from "../redux/store";
export default function Home() {
  const { socket } = useSelector((store) => store.socket);
  console.log("socket" + { socket });
  const { onlineUsers } = useSelector((store) => store.auth);
  console.log(onlineUsers);
  return (
    <>
      <div className="main-home-jsx flex justify-between overflow-hidden h-[550px] w-[850px] rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0">
        <SideBar />
        <MessageContainer />
      </div>
    </>
  );
}
