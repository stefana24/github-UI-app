import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../reducers/fetchUsers";
import fetchUserRepo from "../reducers/fetchUserRepo";
import fetchRepoFiles from "../reducers/fetchRepoFiles";
import convertCode from "../reducers/convertCode";
import { fetchUserData } from "../reducers/fetchUserData";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    userRepos: [],
    inputValue: "",
    loading: false,
    users: [],
    error: "",
    repoFiles: { loading: false, repoContent: [] },
    codeConvert: {
      inputValue: "",
      htmlCode: "",
    },
    userData: {
      followers: 0,
      following: 0,
    },
  },
  reducers: {
    changeInputValue(state, action) {
      state.inputValue = action.payload;
    },
    changeTextareaInput(state, action) {
      state.codeConvert.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchUserRepo.fulfilled, (state, action) => {
      state.userRepos = action.payload;
    });
    builder.addCase(fetchRepoFiles.pending, (state) => {
      state.repoFiles.loading = true;
    });
    builder.addCase(fetchRepoFiles.fulfilled, (state, action) => {
      state.repoFiles.repoContent = action.payload;
      state.repoFiles.loading = false;
    });
    builder.addCase(convertCode.fulfilled, (state, action) => {
      state.codeConvert.htmlCode = action.payload;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      const { followers, following } = action.payload;
      state.userData = {
        followers,
        following,
      };
    });
  },
});

export default usersSlice.reducer;

export const { changeInputValue, changeTextareaInput } = usersSlice.actions;
