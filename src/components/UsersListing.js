import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../features/reducers/fetchUsers";
import { Box, List, ListItem, Typography } from "@mui/material";
import { getFilteredUsers } from "../features/selectors/filterUsers";
const UsersListing = () => {
  const user = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const filteredUsers = useSelector(() => getFilteredUsers(user, filterInput));

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Search Users
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setFilterInput(e.target.value)}
                defaultValue={filterInput}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {loading && <div>Loading..</div>}
      {!loading && error ? <div>Error:{user.error}</div> : null}
      {
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gridGap: "10px",
          }}
        >
          {filteredUsers.map((element) => (
            <ListItem
              key={element.id}
              sx={{
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                "&:hover": {
                  boxShadow: "16px 10px 16px 10px rgba(0,0,0,0.2)",
                },
                transition: "0.3s",
                display: "grid",
                gridTemplateRows: "max-content 150px 1fr",
                textAlign: "center",
                textTransform: "uppercase",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  width: "200px",
                  borderRadius: "20px",
                }}
                src={element.avatar_url}
                alt="avatar"
              />
              <p>{element.login}</p>
            </ListItem>
          ))}
        </List>
      }
    </Box>
  );
};

export default UsersListing;
