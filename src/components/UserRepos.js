import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "../redux/actions/userAction";
const UserRepos = () => {
  const { login } = useParams;
  console.log(login);
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  console.log("user:", user);
  const fetchUserRepo = async () => {
    const response = await axios
      .get(`https://api.github.com/users/${login}/repos`)
      .catch((err) => {
        console.log("Error: ", err);
      });
    dispatch(selectedUser(response.data));
  };
  useEffect(() => {
    if (login) {
      fetchUserRepo();
    }
  }, [login]);
  const renderList = user.map((element) => {
    return (
      <div key={element.id}>
        <div>{element.name}</div>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default UserRepos;
