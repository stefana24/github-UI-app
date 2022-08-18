import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
import { Box, List, ListItem } from "@mui/material";
const UserRepos = () => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRepo(user.inputValue));
  }, []);

  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {
        <List>
          {user.users.map((element) => (
            <ListItem key={element.id}>{element.name}</ListItem>
          ))}
        </List>
      }
    </Box>
  );
};

export default UserRepos;
