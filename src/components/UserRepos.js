import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
import fetchRepoFiles from "../features/reducers/fetchRepoFiles";

import { changeFilterInput } from "../features/data/usersSlice.js";
import { getFilteredRepos } from "../features/selectors/filterRepos";

import { Box, List, ListItem } from "@mui/material";

const UserRepos = () => {
  const navigate = useNavigate();
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
            <ListItem
              onClick={() => {
                dispatch(
                  fetchRepoFiles({ inputValue, repoName: element.name })
                );
                navigate(`/repoFiles?name=${element.name}`); /*?name=${element.name}*/
              }}
              key={element.id}
            >
              {element.name}
            </ListItem>
          ))}
        </List>
      }
    </Box>
  );
};

export default UserRepos;
