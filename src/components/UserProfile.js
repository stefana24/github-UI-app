import { Box, Typography, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "../features/helperFunctions/fetchUser";
import { useParams } from "react-router";

function UserProfile({ setModal }) {
  const { userRepos } = useSelector((state) => state);
  const [userData, setUserData] = useState([]);
  const user = useParams();

  useEffect(() => {
    getUser(user.login, setUserData);
  }, []);

  return (
    <Box sx={{ display: "flex", margin: "2rem 0" }}>
      <Box sx={{ width: "200px" }}>
        <img
          style={{ width: "100%", borderRadius: "20px" }}
          src={userRepos.length > 0 ? userRepos[0].owner.avatar_url : ""}
        />
      </Box>
      <Box
        sx={{
          marginLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
          {user.login}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            columnGap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
              Followers
            </Typography>
            <Typography>
              {userData.length > 0 ? userData[0].length : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
              Following
            </Typography>
            <Typography>
              {userData.length > 0 ? userData[1].length : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#218bff", fontWeight: "bold" }}>
              Repos
            </Typography>
            <Typography>{userRepos.length}</Typography>
          </Box>
          <Button
            sx={{ marginLeft: "2rem" }}
            variant={"outlined"}
            onClick={() => setModal(true)}
          >
            Generate Timeline
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
