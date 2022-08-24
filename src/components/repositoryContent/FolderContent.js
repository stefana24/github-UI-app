import React from "react";
import { useSelector } from "react-redux";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

export default function RecursiveContent() {
  const { stateFile, loading } = useSelector((state) => state.childFiles);
  const folderTree = stateFile.tree;

  return (
    <div>
      {loading === false
        ? folderTree?.map((elemTree) => {
            return (
              <div key={elemTree.sha}>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "2rem",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  {elemTree.type === "tree" ? (
                    <FontAwesomeIcon icon={faFolder} />
                  ) : (
                    <FontAwesomeIcon icon={faFile} />
                  )}
                  <Box sx={{ marginLeft: "0.5rem" }}>{elemTree.path}</Box>
                </Box>
                <Divider sx={{ background: "#545a61" }} />
              </div>
            );
          })
        : null}
    </div>
  );
}
