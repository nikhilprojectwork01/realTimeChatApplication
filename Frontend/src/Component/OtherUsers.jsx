import { useSelector } from "react-redux";
import GetotherUsers from "./Hooks/GetotherUsers.jsx";
import OtherUser from "./OtherUser.jsx";
import store from "../redux/store.js";
import { useEffect, useState } from "react";
export default function OtherUsers() {
  GetotherUsers();
  const { otheruser } = useSelector((store) => store.otheruser);
  const { searchName } = useSelector((store) => store.auth);
  const [filterdata, setfilterData] = useState(otheruser);

  useEffect(() => {
    const filteruser =
      otheruser?.length >= 0 &&
      otheruser.filter((data) => {
        if (!searchName) {
          return data;
        }
        return data?.userName?.toLowerCase().includes(searchName.toLowerCase());
      });
    setfilterData(filteruser);
  }, [otheruser, searchName]);
  if (!otheruser) return; //this concept is called urley return in redux
  return (
    <div
      className=" h-100 overflow-auto scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {filterdata?.map((data, index) => (
        <OtherUser key={index} info={data} />
      ))}
    </div>
  );
}
