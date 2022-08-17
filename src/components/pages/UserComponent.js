import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const UserComponent = () => {
  const users = useSelector((state) => state.allUsers.users);
  const renderList = users.map((user) => {
    return (
      <div key={user.login}>
        <Link to={`/${user.login}`}>
          <div>{user.login}</div>
        </Link>
      </div>
    );
  });

  return <>{renderList}</>;
};

export default UserComponent;
