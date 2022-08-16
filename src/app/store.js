import { configureStore } from "@reduxjs/toolkit";
import DataSlice from "../features/data/DataSlice";

export default configureStore({
  reducer: { data: DataSlice },
});
