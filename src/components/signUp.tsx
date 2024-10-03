"use client";

import { useState } from "react";
import { googleSign, signupWithEmailPassword } from "@/firebase/firebaseauth";
import { setStateType } from "@/types/types";
import { Box, Typography, TextField, Container, Button } from "@mui/material";

function SignUp({ setPageState, pageState }: setStateType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit() {
    signupWithEmailPassword(email, password, name);
  }

  return (
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
          {pageState == "SignUp" ? "Create an Account" : "Sign In"}
        </Typography>

        <Box component="form" noValidate>
          {
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              size="small"
              sx={{ mb: 2 }}
            />
          }

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            id="name"
            type="text"
            name="name"
            size="small"
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
            type="password"
            name="password"
            size="small"
            autoComplete="new-password"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Sign Up
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
  );
}

export default SignUp;
