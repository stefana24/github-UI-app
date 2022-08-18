import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInputValue } from "../../features/data/usersSlice.js";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";
import Image from "../../images/GitHub.jpg";
const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInput = useSelector((state) => state);

  const handleChange = (event) => {
    dispatch(changeInputValue(event.target.value));
  };

  const navigateToUserPage = () => {
    navigate(`/${userInput.inputValue}`);
  };

  const ariaLabel = { "aria-label": "description" };
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={Image} alt="github" />
      <Input
        sx={{ textAlign: "center", marginBottom: 5 }}
        type="text"
        name="username"
        onChange={handleChange}
        value={userInput.inputValue}
        placeholder="Enter username"
        inputProps={ariaLabel}
      />
      <Button onClick={navigateToUserPage} variant="outlined">
        Search
      </Button>
    </Box>
  );
};

export default Homepage;
