import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  console.log("inside fetchUsers");
  const response = await fetch("https://api.github.com/users?per_page=100");
  const result = await response.json();
  return result;
});
