import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://api.github.com/users?per_page=100");
  const result = await response.json();
  console.log("inside fetch");
  return result;
});
