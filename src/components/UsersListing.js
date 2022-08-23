import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../features/reducers/fetchUsers";

const UsersListing = () => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      {user.loading && <div>Loading..</div>}
      {!user.loading && user.error ? <div>Error:{user.error}</div> : null}
      {
        <ul>
          {user.users.map((element) => (
            <li key={element.id}>{element.login}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default UsersListing;
