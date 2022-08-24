import { makeStyles } from "@mui/styles";

export const userProfileStyles = makeStyles((theme) => ({
  userDetails: {
    display: "flex",
    alignItems: "flex-end",
    columnGap: "50px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      rowGap: "20px",
    },
    [theme.breakpoints.down("m")]: {
      alignItems: "flex-start",
    },
  },
  userProfile: {
    display: "flex",
    margin: "40px 20px",
    [theme.breakpoints.down("m")]: {
      flexDirection: "column",
    },
  },
  avatarContainer: {
    width: "200px",
    [theme.breakpoints.down("m")]: {
      width: "100px",
    },
  },
  avatar: {
    width: "200px",
    borderRadius: "20px",
    [theme.breakpoints.down("m")]: {
      width: "100px",
    },
  },
  userDetailsContainer: {
    marginLeft: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("m")]: {
      margin: "0",
      marginTop: "0.8rem",
      rowGap: "40px",
    },
  },
  followersContainer: {
    display: "flex",
    columnGap: "20px",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
}));
