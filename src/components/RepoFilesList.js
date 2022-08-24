import * as React from "react";
import Box from "@mui/material/Box";

import ProgLanguages from "./repositoryContent/ProgLanguages";
import RepoContent from "./repositoryContent/RepoContent";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const RepoFilesList = () => {
  const navigate = useNavigate();
  return (
    <Box>
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
        <Button
          sx={{ marginTop: "1rem" }}
          variant="outlined"
          onClick={() => {
            localStorage.removeItem("Auth Token");
            navigate("/login");
          }}
        >
          Logout
          <FontAwesomeIcon
            style={{ marginLeft: "0.5rem" }}
            icon={faRightFromBracket}
          />
        </Button>
        <RepoContent />
        <ProgLanguages />
      </Box>
    </Box>
  );
};

export default RepoFilesList;
