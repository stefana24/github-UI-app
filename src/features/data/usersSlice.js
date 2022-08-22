import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../reducers/fetchUsers";
import fetchUserRepo from "../reducers/fetchUserRepo";

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
    repoFiles: {
      loading: false,
      repoContent: [],
    },
  },
  reducers: {
    changeInputValue(state, action) {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.users.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.loading = false;
      state.users.usersContent = action.payload;
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
  },
});

export default usersSlice.reducer;

export const { changeInputValue, changeFilterInput } = usersSlice.actions;