import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../features/reducers/fetchUsers";
import { getFilteredUsers } from "../features/selectors/filterUsers";
import { Box, TextField } from "@mui/material";
const UsersListing = () => {
  const { usersContent, loading, error } = useSelector(
    (state) => state.users[0]
  );

  console.log(usersContent);
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const filteredUsers = useSelector(() =>
    getFilteredUsers(usersContent, filterInput)
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <Box>
      <TextField
        type="text"
        onChange={(e) => setFilterInput(e.target.value)}
        defaultValue={filterInput}
      />
      {loading && <div>Loading..</div>}
      {!loading && error ? <div>Error:{error}</div> : null}
      {
        <ul>
          {filteredUsers.map((element) => (
            <li key={element.id}>{element.login}</li>
          ))}
        </ul>
      }
    </Box>
  );
};

export default UsersListing;
