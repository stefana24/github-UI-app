import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { fetchChildContent } from "../../features/reducers/fetchFolderContent";

import RecursiveContent from "./FolderContent";

const RepoContent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { repoContent, loading } = state.repoFiles;

  const [content] = repoContent;
  const username = state.inputValue;

  const [openKey, setOpenKey] = useState("");
  const [showFiles, setShowFiles] = useState(false);

  const { search } = useLocation();
  const repoName = new URLSearchParams(search, [search]);

  function handleClick(e, data) {
    if (data.type === "dir") {
      dispatch(fetchChildContent(data));
      setOpenKey(data.sha);
      setShowFiles((showFiles) => !showFiles);
    }
  }

  return (
    <Box
      component="span"
      sx={{
        marginTop: "4rem",
        width: "50%",
      }}
    >
      <Box
        component="div"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5" gutterBottom sx={{ display: "flex" }}>
          <Link href={`/${username}`} underline="hover">
            {username}
          </Link>
          /
          <Link href="#" underline="hover">
            {repoName.get("name")}
          </Link>
        </Typography>

        {/* Button clone */}

        <span style={{ maxHeight: "1rem" }}>
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
                // `git@github.com:${username}/${repoName.get("name")}.git`
                `https://github.com/${username}/${repoName.get("name")}.git`
              )
            }
          >
            <FontAwesomeIcon icon={faClone} />
            <Box sx={{ marginLeft: "0.5rem" }}>Clone</Box>
          </Button>
        </span>
      </Box>

      {/* content list */}

      <nav>
        <List
          sx={{
            margin: "1rem 0",
            padding: "0",
            border: "0.1rem solid #4a4f55 ",
          }}
        >
          {loading === false
            ? content?.map((element) => (
                <div key={element.sha}>
                  <ListItem
                    onClick={(e) => handleClick(e, element)}
                    sx={{
                      background: "#373b41",
                      display: "flex",
                    }}
                  >
                    {element.type === "dir" ? (
                      <FontAwesomeIcon icon={faFolder} />
                    ) : (
                      <FontAwesomeIcon icon={faFile} />
                    )}
                    <ListItemButton>{element.name}</ListItemButton>{" "}
                  </ListItem>
                  {openKey === element.sha && showFiles && <RecursiveContent />}
                  <Divider sx={{ background: "#545a61" }} />
                </div>
              ))
            : null}
        </List>
      </nav>
    </Box>
  );
};

export default RepoContent;
