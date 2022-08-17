import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
const UserRepos = () => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRepo(user.inputValue));
  }, []);

  console.log(user);
  return (
    <div>
      {
        <ul>
          {user.users.map((element) => (
            <li key={element.id}>{element.name}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default UserRepos;
