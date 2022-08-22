import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../reducers/fetchUsers";
import fetchUserRepo from "../reducers/fetchUserRepo";
import fetchRepoFiles from "../reducers/fetchRepoFiles";
import convertCode from "../reducers/convertCode";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    userRepos: {
      loading: false,
      error: "",
      userReposContent: [],
    },
    inputValue: "",
    users: [
      {
        loading: false,
        error: "",
        usersContent: [],
      },
    ],
    filterInput: "",
    repoFiles: { loading: false, repoContent: [] },
    codeConvert: {
      inputValue: "",
      htmlCode: "",
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
      state.users.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.usersContent = action.payload;
      console.log("payload: ", action.payload);
      state.users.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.usersContent = [];
      state.users.error = action.error.message;
    });

    builder.addCase(fetchUserRepo.fulfilled, (state, action) => {
      state.userRepos.userReposContent = action.payload.map(({ id, name }) => {
        return { id, name };
      });
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
  },
});

export default usersSlice.reducer;

export const { changeInputValue, changeTextareaInput } = usersSlice.actions;
