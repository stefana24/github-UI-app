import * as React from "react";
import Box from "@mui/material/Box";

import ProgLanguages from "./repositoryContent/ProgLanguages";
import RepoContent from "./repositoryContent/RepoContent";

const RepoFilesList = () => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexWrap: "wrap",
        minHeight: "100vh",
        bgcolor: "#22272e",
        color: "#a7b4c1",
      }}
    >
      <RepoContent />
      <ProgLanguages />
    </Box>
  );
};

export default RepoFilesList;
