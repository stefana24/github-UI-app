import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (user) => {
    const followersUrl = `https://api.github.com/users/${user}/followers`;
    const followingUrl = `https://api.github.com/users/${user}/following`;

    const response = await Promise.all(
      [followersUrl, followingUrl].map(async (url) => {
        const fetchResponse = await fetch(url);
        const resultResponse = await fetchResponse.json();
        return resultResponse;
      })
    );

    return { followers: response[0].length, following: response[1].length };
  }
);
