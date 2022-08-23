import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
import fetchRepoFiles from "../features/reducers/fetchRepoFiles";
import { getFilteredRepos } from "../features/selectors/filterRepos";
import { Box, TextField, List, ListItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";
import ReposTimeline from "./Timeline";
import { useParams } from "react-router";
import UserProfile from "./UserProfile";

const UserRepos = () => {
  const navigate = useNavigate();
  const { inputValue } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [modal, setModal] = useState(false);
  const repositories = useSelector((state) =>
    getFilteredRepos(state, filterInput)
  );
  const params = useParams();
  console.log(params);
  useEffect(() => {
    dispatch(fetchUserRepo(params.login))
      .unwrap()
      .then((result) => {
        if (result.length === 0) {
          navigate("/404");
        }
      });
  }, []);

  const useStyles = makeStyles({
    card: {
      color: "#218bff",
      cursor: "pointer",
      margin: "20px",
      paddingTop: "24px",
      paddingBottom: "24px",
      minHeight: "200px",
      borderRadius: "15px",
      transition: "all 0.3s",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
      "&:hover": {
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",
      },
    },
  });

  const inputProps = {
    label: "Find a repository",
    style: { width: "100%", margin: "20px" },
  };

  function ItemStyled({ props }) {
    const classes = useStyles();
    return (
      <ListItem
        className={classes.card}
        key={props.id}
        onClick={() => {
          dispatch(fetchRepoFiles({ inputValue, repoName: props.name }));
          navigate(`/${params.login}/repoFiles?name=${props.name}`);
        }}
      >
        <h3>{props.name}</h3>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        sx={{ position: "absolute", right: "20px", top: "20px" }}
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
          width: "60vw",
        }}
      >
        <TextField
          type="text"
          defaultValue={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          {...inputProps}
          InputProps={{
            endAdornment: <SearchIcon /> ? (
              <InputAdornment position="end">{<SearchIcon />}</InputAdornment>
            ) : null,
          }}
        />
        <UserProfile setModal={setModal} />

        <List>
          {repositories.map((element) => (
            <ItemStyled props={element} key={element.id}>
              {element.name}
            </ItemStyled>
          ))}
        </List>
      </Box>
      <ReposTimeline modal={modal} setModal={setModal} />
    </Box>
  );
};

export default UserRepos;
