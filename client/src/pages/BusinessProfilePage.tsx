import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { outlinedButtonStyle } from "../styles/commonStyles";
import businessIMG from "../mock_data/images/busimg.jpg";

const BusinessProfilePage: React.FC = () => {
  const logoUrl = "/path/to/logo.png";

  return (
    <Box>
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          position: "relative",
          userSelect: "none",
          paddingTop: "20px",
          paddingLeft: "50px",
          paddingBottom: "10px",
          paddingRight: "50px",
        }}
      >
        <div
          style={{
            position: "absolute",
            filter: "brightness(0.7)",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${businessIMG})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              filter: "brightness(0.7)",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              // mb: "15px",
              // mt: "15px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h3"
                sx={{ position: "relative", color: "white" }}
                fontWeight="bold"
              >
                CookingPal
              </Typography>

              <Typography
                variant="h6"
                component="h5"
                sx={{ position: "relative", color: "white" }}
              >
                Raise your cooking game, with precision machines that inspire
                confidence. Discover the future of cooking.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                //   justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  1209
                </Typography>
                <Typography sx={{ color: "white" }}>Followers</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  600
                </Typography>
                <Typography sx={{ color: "white" }}>Users</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "white" }}
                >
                  209
                </Typography>
                <Typography sx={{ color: "white" }}>Top Users</Typography>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Button variant="outlined" sx={outlinedButtonStyle}>
                  FOLLOW
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mb: "15px",
              position: "relative",
            }}
          >
            <Avatar
              alt="Business Logo"
              src={logoUrl}
              sx={{ width: 200, height: 200, border: "15px solid white" }}
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default BusinessProfilePage;
