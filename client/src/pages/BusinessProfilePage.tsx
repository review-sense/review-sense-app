import React from "react";
import { Box, Typography, Avatar, Grid, Rating, Button } from "@mui/material";
import { outlinedButtonStyle, textButtonStyle } from "../styles/commonStyles";
import businessIMG from "../mock_data/images/busimg.jpg";

const BusinessProfilePage: React.FC = () => {
  const logoUrl = "/path/to/logo.png";
  const followers = 500;
  const users = 1000;
  const topUsers = 5;
  const rating = 4.5;
  const description = "Your business slogan or short description goes here.";

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
            // flexDirection: "column",
            // mb: "15px",
            // mt: "15px",
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
              sx={{ width: 200, height: 200 }}
            />
          </Box>
        </Box>
      </div>

      <Box mt={2}>
        <Typography variant="body1">Followers: {followers}</Typography>
        <Typography variant="body1">Users: {users}</Typography>
        <Typography variant="body1">Top Users: {topUsers}</Typography>
      </Box>

      <Box mt={2}>
        <Rating
          name="business-rating"
          value={rating}
          precision={0.5}
          readOnly
        />
      </Box>

      <Box mt={2}>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Box>
  );
};

export default BusinessProfilePage;