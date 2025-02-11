import { useSelector } from "react-redux";
import useGetallMessages from "./Hooks/useGetallMessages";
import SingleMessage from "./SingleMessage";
import useGetRealTimeMessage from "./Hooks/useGetRealTimeMessage";

export default function ShowMessage() {
  useGetallMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.messages);
  console.log(messages);
  if (!messages) return;
  return (
    <div className="message-section" style={{ scrollbarWidth: "none" }}>
      {messages &&
        messages?.map((data) => <SingleMessage info={data} key={data?._id} />)}
    </div>
  );
}
