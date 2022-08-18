import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserRepo = createAsyncThunk(
  "user/fetchUserRepo",
  async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const result = await response.json();

    return result;
  }
);

export default fetchUserRepo;
