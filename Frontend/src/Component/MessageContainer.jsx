import { useSelector } from "react-redux";
import SendInput from "./SendInput";
import ShowMessage from "./ShowMessage";
import store from "../redux/store";

export default function MessageContainer() {
  const { selectedUser, authUser } = useSelector((store) => store.auth);
  return (
    <>
      {selectedUser !== null ? (
        <div className="border-l border-l-white-300 md:min-w-[550px] flex flex-col justify-between">
          <div className="header-div  bg-gray-700 m-2 rounded-2xl ">
            <div className=" flex items-center p-2 rounded-2xl">
              <div>
                <div className="h-2 w-2 rounded-4xl bg-green-600 relative top-2 left-7"></div>
                <div className=" h-10 w-10 rounded-3xl">
                  <img
                    className="h-full w-full rounded-3xl"
                    src={selectedUser?.profilePhoto}
                    alt="image"
                  />
                </div>
              </div>
              <div className="ml-2">
                <p>{selectedUser?.userName}</p>
              </div>
            </div>
          </div>
          <ShowMessage />
          <div>
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center  flex-col">
          <h1 className="text-3xl">
            hi{" "}
            <span className="text-red-700 font-extrabold">
              {authUser?.userName}
            </span>
          </h1>
          <h1 className="text-3xl">Talk about an event or situation.....</h1>
        </div>
      )}
    </>
  );
}
