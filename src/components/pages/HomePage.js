import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeInputValue } from "../../features/data/usersSlice.js";
import Button from "@mui/material/Button";
import { Box, TextField, IconButton } from "@mui/material";
import Image from "../../images/GitHub.jpg";
import { makeStyles } from "@mui/styles";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import fetchUserRepo from "../../features/reducers/fetchUserRepo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputValue } = useSelector((state) => state);

  const handleChange = (event) => {
    dispatch(changeInputValue(event.target.value));
  };

  const navigateToUserPage = () => {
    dispatch(fetchUserRepo(inputValue))
      .unwrap()
      .then((result) => {
        result.length !== 0 ? navigate(`/${inputValue}`) : navigate(`/404`);
      });
  };

  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(45deg, #B1E1FF 30%, #C1EFFF 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(155, 105, 105, .3)",
      height: 48,
      padding: "20px 30px",
    },
  });

  function ButtonStyled() {
    const classes = useStyles();
    return (
      <Button
        sx={{ marginLeft: "1rem" }}
        className={classes.root}
        startIcon={<PersonSearchIcon />}
        onClick={navigateToUserPage}
      >
        Search
      </Button>
    );
  }

  return (
    <>
      <Button
        sx={{ marginTop: "1rem" }}
        variant="outlined"
        onClick={() => {
          localStorage.removeItem("Auth Token");
          navigate("/login");
        }}
      >
        Logout
        <FontAwesomeIcon
          style={{ marginLeft: "0.5rem" }}
          icon={faRightFromBracket}
        />
      </Button>

      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 7,
          width: 3 / 4,
          color: "",
          minHeight: 450,
          position: "absolute",
          top: "50%",
          left: "50%",
          marginRight: "-50%",
          transform: "translate(-50%, -50%) ",
        }}
      >
        <img src={Image} alt="github" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            required
            id="outlined-basic"
            label="Username"
            variant="outlined"
            color="primary"
            type="text"
            onChange={handleChange}
            value={inputValue}
          />
          <ButtonStyled />
        </Box>
        <Button
          sx={{ marginTop: "2rem" }}
          variant="outlined"
          onClick={() => navigate("/convert")}
        >
          HTML Viewer
        </Button>
      </Box>
    </>
  );
};

export default Homepage;
