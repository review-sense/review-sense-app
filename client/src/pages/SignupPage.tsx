import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
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
          borderRadius: "6px",
          border: "4px solid #d5e8ed",
          backgroundColor: "#f5f9fc",
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
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderWidth: 3,
              borderColor: "#3287e6",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3287e6",
            },
            "& .MuiInputLabel-root.Mui-focused ": { color: "#3287e6" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#3287e6",
              },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderWidth: 3,
              borderColor: "#3287e6",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3287e6",
            },
            "& .MuiInputLabel-root.Mui-focused ": { color: "#3287e6" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#3287e6",
              },
          }}
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderWidth: 3,
              borderColor: "#3287e6",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3287e6",
            },
            "& .MuiInputLabel-root.Mui-focused ": { color: "#3287e6" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#3287e6",
              },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#35ab39",
            "&:hover": {
              backgroundColor: "#35ab39",
            },
            mt: "15px",
            fontWeight: "bold",
          }}
          fullWidth
          onClick={handleLogin}
        >
          Sign up
        </Button>
      </Box>
    </Container>
  );
};
export default SignupPage;
