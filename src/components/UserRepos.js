import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
import { changeFilterInput } from "../features/data/usersSlice.js";
import { getFilteredRepos } from "../features/selectors/filterRepos";
import { Box, List, ListItem, Input, Button } from "@mui/material";
import Image from "../images/GitHub.jpg";
import ReposTimeline from "./Timeline";
import { useLocation } from "react-router";

const UserRepos = () => {
  const dispatch = useDispatch();
  const { inputValue } = useSelector((state) => state);
  const [filterInput, setFilterInput] = useState("");
  const [modal, setModal] = useState(false);
  const repositories = useSelector((state) =>
    getFilteredRepos(state, filterInput)
  );

  useEffect(() => {
    dispatch(fetchUserRepo(inputValue));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <Input
          sx={{ width: "300px" }}
          type="text"
          onChange={(e) => setFilterInput(e.target.value)}
          value={filterInput}
          placeholder="Search..."
        />
        <Box>
          <img style={{ width: "130px" }} src={Image} alt="github" />
        </Box>
      </Box>
      <Button
        variant={"outlined"}
        sx={{ marginLeft: "1rem" }}
        onClick={() => setModal(true)}
      >
        Generate Timeline
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {
          <List>
            {repositories.map((element) => (
              <ListItem key={element.id}>{element.name}</ListItem>
            ))}
          </List>
        }
      </Box>
      <ReposTimeline modal={modal} setModal={setModal} />
    </>
  );
};

export default UserRepos;
