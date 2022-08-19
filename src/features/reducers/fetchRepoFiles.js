import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchRepoFiles = createAsyncThunk(
  "user/fetchRepoFiles",
  async ({ inputValue, repoName }) => {
    const repoData = [
      `https://api.github.com/repos/${inputValue}/${repoName}/contents/`,
      `https://api.github.com/repos/${inputValue}/${repoName}/languages`,
    ];

    const result = await Promise.all(
      repoData.map(async (_value, i) => {
        const data = await fetch(repoData[i]);
        const parse = await data.json();
        return parse;
      })
    );

    if (result.length > 0) {
      return result;
    }
    return [];
  }
);

export default fetchRepoFiles;
