import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { filledButtonStyle, textFieldStyle } from "../styles/commonStyles";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
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
          <Typography variant="h5">Log in to EngageSense</Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "16px",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Button
            variant="contained"
            sx={{
              ...filledButtonStyle,
              fontWeight: "bold",
            }}
            fullWidth
            onClick={handleLogin}
          >
            Log in
          </Button>
        </Box>
      </Container>
    </div>
  );
};
export default LoginPage;
