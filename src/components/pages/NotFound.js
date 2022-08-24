import Image from "../../images/notFoundImg.png";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const NotFound = () => {
  const title = "Oups...User not found!";
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#3B9AE1",
            backgroundAttachment: "fixed",
            backgroundPosition: "center center",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default NotFound;
