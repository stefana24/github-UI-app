import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const RepoFilesList = () => {
  const state = useSelector((state) => state);
    const { repoContent, loading } = useSelector((state) => state.repoFiles);
  //   console.log(repoContent);
    const contents = repoContent[0];
    const languages = repoContent[1];
//   console.log(state);

  const { search } = useLocation();
  const repoName = new URLSearchParams(search, [search]);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <div>{repoName.get("name")}</div>
      <nav aria-label="secondary mailbox folders">
        <List>
          {loading === false
            ? contents?.map((element) => (
                <ListItem key={element.sha}>
                  <ListItemButton>{element.name}</ListItemButton>
                </ListItem>
              ))
            : null}
        </List>
      </nav>
    </Box>
  );
};

export default RepoFilesList;
