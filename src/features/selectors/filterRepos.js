import { createSelector } from "@reduxjs/toolkit";

export const getFilteredRepos = createSelector(
  (state) => state.userRepos,
  (state, input) => input,
  (repos, input) => {
    return repos.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
  }
);
