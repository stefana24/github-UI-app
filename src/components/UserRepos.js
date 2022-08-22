import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchUserRepo from "../features/reducers/fetchUserRepo";

import { changeFilterInput } from "../features/data/usersSlice";
import { getFilteredRepos } from "../features/selectors/filterRepos";

import { Box, TextField, List, ListItem, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { makeStyles } from "@mui/styles";
import ReposTimeline from "./Timeline";

const UserRepos = () => {
  const navigate = useNavigate();
  const { inputValue } = useSelector((state) => state);
  const { userReposContent, loading } = useSelector((state) => state.userRepos);
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [modal, setModal] = useState(false);
  const repositories = useSelector((state) =>
    getFilteredRepos(userReposContent, filterInput)
  );

  useEffect(() => {
    dispatch(fetchUserRepo(inputValue));
  }, []);

  console.log(userReposContent);
  const IconTextField = ({ iconEnd, InputProps, ...props }) => {
    return (
      <TextField
        type="text"
        onChange={(e) => setFilterInput(e.target.value)}
        defaultValue={filterInput}
        {...props}
        InputProps={{
          ...InputProps,
          endAdornment: iconEnd ? (
            <InputAdornment position="end">{iconEnd}</InputAdornment>
          ) : null,
        }}
      />
    );
  };

  const useStyles = makeStyles({
    card: {
      color: "#218bff",
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

  function ItemStyled({ props }) {
    const classes = useStyles();
    return (
      <ListItem className={classes.card} key={props.id}>
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
      <Box
        sx={{
          width: "60vw",
        }}
      >
        <IconTextField
          label="Find a repository"
          iconEnd={<SearchIcon />}
          style={{ width: "100%", margin: "20px" }}
        />

        <Button
          variant={"outlined"}
          sx={{ marginLeft: "1rem" }}
          onClick={() => setModal(true)}
        >
          Generate Timeline
        </Button>
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
