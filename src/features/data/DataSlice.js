import { createSlice } from "@reduxjs/toolkit";
import { fetchUserRepo } from "../reducers/fetchUserRepo";

export const DataSlice = createSlice({
  name: "data",
  initialState: {
    repos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserRepo.fulfilled, (state, action) => {
      state.repos = action.payload;
    });
  },
});

export default DataSlice.reducer;
