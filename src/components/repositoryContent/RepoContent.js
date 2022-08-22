import React from "react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const RepoContent = () => {
  const state = useSelector((state) => state);
  const { repoContent, loading } = state.repoFiles;

  const [content] = repoContent;
  const username = state.inputValue;
  let location = useLocation();
  const { search } = useLocation();
  const repoName = new URLSearchParams(search, [search]);

  return (
    <Box
      component="span"
      sx={{
        width: "50%",
        padding: "1rem",
      }}
    >
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5" gutterBottom sx={{ display: "flex" }}>
          <Link href="/:login" underline="hover">
            {username}
          </Link>
          /
          <Link href="#" underline="hover">
            {repoName.get("name")}
          </Link>
        </Typography>
        <Button
          sx={{
            background: "#8ce99a",
            color: "#22272e",
            "&:hover": {
              background: "#69db7c",
            },
          }}
          onClick={() =>
            navigator.clipboard.writeText(
              `https://github.com/${username}/${repoName.get("name")}.git`
            )
          }
        >
          Clone
        </Button>
      </Box>

      <nav>
        <List sx={{ marginBottom: "1.5rem" }}>
          {loading === false
            ? content?.map((element) => (
                <>
                  <ListItem sx={{ background: "#373b41" }} key={element.sha}>
                    {element.type === "dir" ? (
                      <FontAwesomeIcon icon={faFolder} />
                    ) : (
                      <FontAwesomeIcon icon={faFile} />
                    )}
                    <ListItemButton>{element.name}</ListItemButton>{" "}
                  </ListItem>
                  <Divider sx={{ background: "#545a61" }} />
                </>
              ))
            : null}
        </List>
      </nav>
    </Box>
  );
};

export default RepoContent;
