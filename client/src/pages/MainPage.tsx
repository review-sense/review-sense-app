import {
  Typography,
  Container,
  Grid,
  Box,
  Rating,
  Button,
} from "@mui/material";
import React from "react";
import sampleIMG from "../mock_data/images/doge-meme-22.jpg";
import backIMG from "../mock_data/images/websback.jpg";
import { useNavigate } from "react-router-dom";
import { outlinedButtonStyle, textButtonStyle } from "../styles/commonStyles";
import { useGetBusinesses } from "../queries/business";

const MainPage: React.FC = () => {
  const { isSmall } = useViewport();
  const { data: businessesData, isLoading: isBusinessesDataLoading } =
    useGetBusinesses();

  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#f2f2f2",
        overflowY: "auto",
        height: "100vh",
        padding: "20px",
      }}
    >
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
          borderRadius: "32px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            filter: "brightness(0.6)",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${backIMG})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "150px" }}
        >
          <Typography
            variant="h6"
            component="div"
            // sx={{ flexGrow: 1, color: "black" }}
            sx={{ position: "relative", color: "white" }}
          >
            EngageSense
          </Typography>
          {/* TODO: uncomment when implementing login and signup */}
          {/* <Box sx={{ position: "relative", mb: "100px" }}>
            <Button
              variant="text"
              sx={textButtonStyle}
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              sx={outlinedButtonStyle}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box> */}
        </Box>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ position: "relative", color: "white" }}
        >
          Earn cash for engaging with your favourite business
        </Typography>
      </div>

      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography
            variant="body2"
            color="#488afa"
            sx={{ paddingLeft: "20px" }}
          >
            Suggested Businesses
          </Typography>

          {!isBusinessesDataLoading &&
            businessesData.data.map((business, index) => (
              <Grid key={index}>
                <Box
                  sx={{
                    padding: "16px 20px",
                    boxShadow: "rgb(230, 230, 230) 0px -1px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ paddingRight: "20px" }}>
                    <Box
                      sx={{
                        width: "200px",
                        maxHeight: "200px",
                      }}
                    >
                      <img
                        src={sampleIMG}
                        alt="Uploaded"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          borderRadius: "6px",
                        }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ mb: 0 }}
                    >
                      {business.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {business.type}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      defaultValue={business.rating}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <Typography variant="body2">{business.address}</Typography>
                    <Typography variant="body2" color="green">
                      {business.hours}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Box>
      </Box>
    </div>
  );
};
export default MainPage;
