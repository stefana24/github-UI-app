import { Box, Typography, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { userProfileStyles } from "./styles/userProfileStyles";
import { fetchUserData } from "../features/reducers/fetchUserData";

function UserProfile({ setModal }) {
  const { userRepos, userData } = useSelector((state) => state);
  const user = useParams();
  const classes = userProfileStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData(user.login));
  }, []);

  return (
    <Box className={classes.userProfile}>
      <Box className={classes.avatarContainer}>
        <img
          className={classes.avatar}
          src={userRepos.length > 0 ? userRepos[0].owner.avatar_url : ""}
        />
      </Box>
      <Box className={classes.userDetailsContainer}>
        <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
          {user.login}
        </Typography>
        <Box className={classes.userDetails}>
          <Box className={classes.followersContainer}>
            {["Followers", "Following", "Repos"].map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
                    {item}
                  </Typography>
                  <Typography>
                    {item.toLowerCase() in userData
                      ? userData[item.toLowerCase()]
                      : userRepos.length}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Button variant={"outlined"} onClick={() => setModal(true)}>
            Generate Timeline
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
