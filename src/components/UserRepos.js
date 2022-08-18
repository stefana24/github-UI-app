import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchUserRepo from "../features/reducers/fetchUserRepo";

import { changeFilterInput } from "../features/data/usersSlice.js";
import { getFilteredRepos } from "../features/selectors/filterRepos";

import { Box, List, ListItem } from "@mui/material";

const UserRepos = () => {
  const { filterInput, inputValue } = useSelector((state) => state);
  const dispatch = useDispatch();
  const repositories = useSelector((state) =>
    getFilteredRepos(state, filterInput)
  );
  useEffect(() => {
    dispatch(fetchUserRepo(inputValue));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        onChange={(e) => dispatch(changeFilterInput(e.target.value))}
        defaultValue={filterInput}
      />
      {
        <List>
          {repositories.map((element) => (
            <ListItem key={element.id}>{element.name}</ListItem>
          ))}
        </List>
      }
    </Box>
  );
};

export default UserRepos;
