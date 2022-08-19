import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchUserRepo = createAsyncThunk(
  "user/fetchUserRepo",
  async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const result = await response.json();

    // console.log(result);
    if (result.length > 0) {
      return result;
    }
    return [];
  }
);

export default fetchUserRepo;
