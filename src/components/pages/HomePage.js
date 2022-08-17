import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInputValue } from "../../features/data/usersSlice.js";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state);

  const handleChange = (event) => {
    console.log(event.target.value);
    dispatch(changeInputValue(event.target.value));
  };

  const navigateToUserPage = () => {
    navigate(`/${userInput.inputValue}`);
  };

  console.log(userInput);
  return (
    <div>
      <div>Github UI app</div>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={userInput.inputValue}
      />
      <button onClick={navigateToUserPage}>Search</button>
    </div>
  );
};

export default Homepage;
