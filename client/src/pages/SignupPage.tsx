import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { filledButtonStyle, textFieldStyle } from "../styles/commonStyles";
import { usePostRegisterUser } from "../queries/users";

const SignupPage = () => {
  const { mutateAsync: registerUserMutation } = usePostRegisterUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    // Password validation
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUserMutation({
        email: email,
        password: password,
        role: "user",
      });

      console.log("User registered:", response);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#f2f7ff",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 10,
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            LOGO
          </Typography>
          <Typography variant="h5">Sign up to EngageSense</Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "16px",
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            sx={textFieldStyle}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{
              ...filledButtonStyle,
              fontWeight: "bold",
            }}
            fullWidth
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SignupPage;
