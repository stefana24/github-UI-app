import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import UserComponent from "./pages/UserComponent";
import { setUser } from "../redux/actions/userAction";
const UsersListing = () => {
  const users = useSelector((state) => state);
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    const response = await axios
      .get("https://api.github.com/users")
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setUser(response.data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("Users:", users);
  return (
    <div>
      <UserComponent />
    </div>
  );
};

export default UsersListing;
