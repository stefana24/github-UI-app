import { Box, Button, TextField, FormControl } from "@mui/material";
import { useState } from "react";
import Image from "../images/GitHub.jpg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import app from "../app/firebase/firebaseConfig";

function Register() {
  const [user, setUser] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const navigate = useNavigate();
  const authToken = localStorage.getItem("Auth Token");

  if (authToken) {
    return <Navigate to="/" />;
  }

  async function handleSubmit() {
    const auth = getAuth();

    if (user.value.length < 1) {
      setUser({ ...user, error: "Email required." });
      return;
    }

    if (password.value.length < 6) {
      setPassword({
        ...password,
        error: "Password must be at least 6 characters long.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        user.value,
        password.value
      ).then((response) => {
        localStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        navigate("/");
      });
    } catch (e) {
      setUser({ ...user, error: "Email invalid." });
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
      <FormControl sx={{ display: "flex", rowGap: "20px" }}>
        <TextField
          name="email"
          label="Email"
          type="text"
          error={!!user.error}
          helperText={user.error}
          defaultValue={user.value}
          onChange={(e) =>
            setUser({ ...user, value: e.target.value, error: "" })
          }
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          error={!!password.error}
          helperText={password.error}
          defaultValue={password.value}
          onChange={(e) =>
            setPassword({ ...password, value: e.target.value, error: "" })
          }
        />
        <Button
          variant="outlined"
          sx={{ marginTop: "1rem" }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
      </FormControl>
    </Box>
  );
}

export default Register;
