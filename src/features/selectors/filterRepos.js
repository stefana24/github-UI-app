import { createSelector } from "@reduxjs/toolkit";

export const getFilteredRepos = createSelector(
  (state) => state,
  (state, input) => input,
  (repos, input) => {
    return repos.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
  }
);
