import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import calculatePercentage from "../features/helperFunctions/calculatePercentage";

const RepoFilesList = () => {
  const { repoContent, loading } = useSelector((state) => state.repoFiles);
  const [contents, languages, gitColors] = repoContent;

  const percentageArr = Object.entries(languages).map(([, percent]) => percent);

  const { search } = useLocation();
  const repoName = new URLSearchParams(search, [search]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#22272e",
      }}
    >
      <Box
        sx={{
          width: "50%",
          bgcolor: "#22272e",
          color: "#a7b4c1",
          padding: "1rem",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {repoName.get("name")}
        </Typography>

        <nav aria-label="secondary mailbox folders">
          <List sx={{ marginBottom: "1.5rem" }}>
            {loading === false
              ? contents?.map((element) => (
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
        <>
          {loading === false ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  sx={{ padding: "0.3rem 0.6rem", alignSelf: "flex-start" }}
                >
                  Languages
                </Typography>

                {/* Languages percentage */}

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: "0.5rem",
                  }}
                >
                  {loading === false
                    ? Object.entries(languages).map(
                        ([languageName, percent]) => (
                          <Box key={languageName}>
                            <Box
                              sx={{
                                marginLeft: "1rem",
                                display: "flex",
                              }}
                            >
                              {" "}
                              <Box
                                sx={{
                                  background: gitColors[languageName].color,
                                  width: "0.5rem",
                                  height: "0.5rem",
                                  borderRadius: "50%",
                                  alignSelf: "center",
                                  marginRight: "0.5rem",
                                }}
                              ></Box>
                              {`${languageName}: ${calculatePercentage(
                                percent,
                                percentageArr
                              ).toFixed(2)}%`}
                            </Box>
                          </Box>
                        )
                      )
                    : null}
                </Box>

                {/* language color bar */}

                <Box
                  sx={{
                    height: "0.5rem",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {Object.entries(languages).map(
                    ([languageName, percent], i) => (
                      <Box
                        key={languageName}
                        sx={{
                          background: gitColors[languageName].color,
                          width: `${calculatePercentage(
                            percent,
                            percentageArr
                          )}%`,
                          height: "100%",
                        }}
                      ></Box>
                    )
                  )}
                </Box>
              </Box>
            </Box>
          ) : null}
        </>
      </Box>
    </Box>
  );
};

export default RepoFilesList;
