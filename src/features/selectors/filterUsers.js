import { createSelector } from "@reduxjs/toolkit";

export const getFilteredUsers = createSelector(
  (usersContent) => usersContent,
  (state, input) => input,
  (usersContent, input) => {
    return usersContent.filter((item) =>
      item.login.toLowerCase().includes(input.toLowerCase())
    );
  }
);
