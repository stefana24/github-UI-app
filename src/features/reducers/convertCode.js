import { createAsyncThunk } from "@reduxjs/toolkit";

const convertCode = createAsyncThunk("user/convertCode", async (code) => {
  const response = await fetch("https://api.github.com/markdown", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mode: "markdown", text: code }),
  });
  const result = await response.text();
  return result;
});

export default convertCode;
