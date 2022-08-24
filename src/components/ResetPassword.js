import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import Image from "../images/GitHub.jpg";
import { Navigate } from "react-router-dom";

function ResetPassword() {
  const [user, setUser] = useState({ value: "", error: "" });

  const navigate = useNavigate();
  const auth = getAuth();
  const authToken = localStorage.getItem("Auth Token");

  if (authToken) {
    return <Navigate to="/" />;
  }

  async function resetPassword() {
    if (user.value.length < 1) {
      setUser({ ...user, error: "Email required." });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, user.value);
      navigate("/login");
    } catch (e) {
      setUser({ ...user, error: "Couldn't find your account." });
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "300px",
      }}
    >
      <img
        style={{
          width: "100px",
          margin: "auto",
          marginBottom: "1.5rem",
          cursor: "pointer",
        }}
        src={Image}
        onClick={() => navigate("/")}
        alt="GitHub"
      />
      <TextField
        name="email"
        type="text"
        error={!!user.error}
        helperText={user.error}
        label="Email"
        defaultValue={user.value}
        onChange={(e) => setUser({ ...user, value: e.target.value, error: "" })}
      />
      <Button
        sx={{ marginTop: "2rem" }}
        onClick={resetPassword}
        variant="outlined"
      >
        Reset Password
      </Button>
    </Box>
  );
}

export default ResetPassword;
