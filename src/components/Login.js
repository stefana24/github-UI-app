import { Box, Button, TextField, FormControl, Typography } from "@mui/material";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import Image from "../images/GitHub.jpg";

function Login() {
  const [user, setUser] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, user.value, password.value).then(
        (response) => {
          localStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          navigate("/");
        }
      );
    } catch (e) {
      setError("The username or password you entered is incorrect.");
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
      />
      <FormControl sx={{ display: "flex", rowGap: "20px" }}>
        <TextField
          name="email"
          label="Email"
          type="text"
          defaultValue={user.value}
          onChange={(e) => {
            setUser({ ...user, value: e.target.value, error: "" });
            setError("");
          }}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          defaultValue={password.value}
          onChange={(e) => {
            setPassword({ ...password, value: e.target.value, error: "" });
            setError("");
          }}
        />
        <Typography sx={{ fontSize: "0.9rem", color: "red" }}>
          {error}
        </Typography>
        <Button variant="outlined" onClick={handleLogin}>
          Sign in
        </Button>
        <Button variant="outlined" onClick={() => navigate("/register")}>
          Create Account
        </Button>
        <Button variant="outlined" onClick={() => navigate("/resetPassword")}>
          Reset Password
        </Button>
      </FormControl>
    </Box>
  );
}

export default Login;
