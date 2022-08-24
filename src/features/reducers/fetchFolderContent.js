import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChildContent = createAsyncThunk(
  "user/fetchChildContent",
  async ({ git_url }) => {
    const response = await fetch(git_url);
    const result = await response.json();
    return result;
  }
);
