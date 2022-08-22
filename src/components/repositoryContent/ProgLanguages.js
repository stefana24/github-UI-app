import React from "react";
import calculatePercentage from "../../features/helperFunctions/calculatePercentage";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProgLanguages = () => {
  const { repoContent, loading } = useSelector((state) => state.repoFiles);
  const [, languages, gitColors] = repoContent;

  const percentageArr = languages
    ? Object.entries(languages).map(([, percent]) => percent)
    : [];
  return (
    <>
      {loading === false ? (
        <Box
          component="span"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
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
            />
            {loading === false
              ? Object.entries(languages).map(([languageName, percent]) => (
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
                ))
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
            {Object.entries(languages).map(([languageName, percent], i) => (
              <Box
                key={languageName}
                sx={{
                  background: gitColors[languageName].color,
                  width: `${calculatePercentage(percent, percentageArr)}%`,
                  height: "100%",
                }}
              ></Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ProgLanguages;
