import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  previewContainer: {
    width: "100%",
    minHeight: "550px",
    display: "flex",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      height: "800px",
    },
  },
  htmlContainer: {
    width: "50%",
    fontFamily: "Open Sans",
    padding: "10px",
    border: "1px solid black",
    height: "550px",
    overflowY: "scroll",
    paddingLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnsContainer: {
    margin: "2rem auto",
    columnGap: "20px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      width: "160px",
    },
  },
}));
