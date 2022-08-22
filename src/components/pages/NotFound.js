import Image from "../../images/notFoundImg.png";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
const NotFound = () => {
  const title = "Oups...User not found!";
  const styles = {
    paperContainer: {
      backgroundImage: `url(${Image})`,
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      backgroundSize: "contain",
      backgroundColor: "#3B9AE1",
    },
  };
  return (
    <Box style={styles.paperContainer}>
      {" "}
      {/* <img src={Image} alt="github 404" /> */}
      <ImageListItemBar
        title={title}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${title}`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </Box>
  );
};

export default NotFound;
