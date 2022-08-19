import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Stack } from "@mui/material";

const RepoFilesList = () => {
  const { repoContent, loading } = useSelector((state) => state.repoFiles);
  const contents = repoContent[0];
  const languages = repoContent[1];

  const { search } = useLocation();
  const repoName = new URLSearchParams(search, [search]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 440,
        bgcolor: "#22272e" /*"background.paper"*/,
        color: "#a7b4c1",
        padding: "1rem",
      }}
    >
      <Box>{repoName.get("name")}</Box>
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

      <Stack direction="row" spacing={2}>
        {/* {Object.entries(languages).forEach((val) => console.log(val))} */}
      </Stack>
    </Box>
  );
};

export default RepoFilesList;
