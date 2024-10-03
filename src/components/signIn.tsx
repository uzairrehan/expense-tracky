"use client";

import { useState } from "react";
import { googleSign, loginWithEmailPassword, passwordReset } from "@/firebase/firebaseauth";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { setStateType } from "@/types/types";

function SignIn({ setPageState, pageState }: setStateType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    loginWithEmailPassword(email, password);
  }

  function handlePasswordReset() {
    if (email) {
      passwordReset(email);
    } else {
      alert("Please enter your email address to reset your password.");
    }
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center", 
            }}
          >
            <Button
              variant={pageState == "SignUp" ? "contained" : "outlined"}
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => {
                setPageState("SignUp");
              }}
            >
              Sign Up
            </Button>
            <Button
              variant={pageState == "SignIn" ? "contained" : "outlined"}
              color="primary"
              onClick={() => {
                setPageState("SignIn");
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", mb: 3 }}
          >
            Sign In to Your Account
          </Typography>

          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              size="small"
              type="email"
              name="email"
              autoComplete="email"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              size="small"
              type="password"
              name="password"
              sx={{ mb: 2 }}
            />

            <Button
              onClick={handlePasswordReset}
              sx={{
                textTransform: "none",
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              Forgot Password?
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={googleSign}
              sx={{ mt: 2 }}
            >
              Google Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignIn;
