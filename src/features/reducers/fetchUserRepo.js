import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRepo = createAsyncThunk(
  "users/fetchUserRepo",
  async () => {
    const response = await fetch("https://api.github.com/users/mojombo/repos");
    const result = await response.json();

    return result;
  }
);
