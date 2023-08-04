import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { filledButtonStyle, textFieldStyle } from "../styles/commonStyles";
import { usePostRegisterUser } from "../queries/users";

const SignupPage = () => {
  const { mutateAsync: registerUserMutation } = usePostRegisterUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);

    console.log(
      "sending this",
      JSON.stringify({
        email: username,
        password: password,
        role: "user",
      })
    );
    await registerUserMutation({
      email: username,
      password: password,
      role: "user",
    });
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
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
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
            sx={textFieldStyle}
          />
          <TextField
            label="Confirm password"
            variant="outlined"
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
            Sign up
          </Button>
        </Box>
      </Container>
    </div>
  );
};
export default SignupPage;
