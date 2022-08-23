import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://api.github.com/users");
  const result = await response.json();
  return result;
});
