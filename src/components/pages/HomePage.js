import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const navigateToUserPage = () => {
    navigate(`/${username}`);
  };
  return (
    <div>
      <div>Github UI app</div>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={username}
      />
      <button onClick={navigateToUserPage}>Search</button>
    </div>
  );
};

export default Homepage;
