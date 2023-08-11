import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Container,
  Grid,
  Box,
  Rating,
  Tabs,
  Tab,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sampleIMG from "../mock_data/images/doge-meme-22.jpg";
import backIMG from "../mock_data/images/websback.jpg";
import businessIMG from "../mock_data/images/cookingpal.jpg";
import businessLOGO from "../mock_data/images/cooklogo.jpg";
import businessIMG2 from "../mock_data/images/cycleboard.jpg";
import businessLOGO2 from "../mock_data/images/cyclelogo.jpg";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import { ListResult } from "../representations/results";
import { outlinedButtonStyle, textButtonStyle } from "../styles/commonStyles";
import { useGetBusinesses } from "../queries/business";

const LandingPage: React.FC = () => {
  const { data: businessesData, isLoading: isBusinessesDataLoading } =
    useGetBusinesses();

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      style={{
        // display: "flex",
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
              // filter: "brightness(0.9)",
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
        {/* TODO: uncomment when implemlementing search bar */}
        {/* <TextField
          // label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          placeholder="Search"
          InputProps={{
            style: { backgroundColor: "white", opacity: "0.9" }, // Add this to change the background color
          }}
          sx={{
            mb: "100px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.5)",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "transparent", // Remove the blue outline
              },
            },
          }}
        /> */}
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
          // paddingLeft: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TODO: uncomment when implemlementing business categories */}
        {/* <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile>
          <Tab
            icon={<RestaurantMenuOutlinedIcon />}
            label="Eat Out"
            sx={{ color: "#ffa214" }}
          />
          <Tab
            icon={<ShoppingBagOutlinedIcon />}
            label="Goods"
            sx={{ color: "#27b04e" }}
          />
          <Tab
            icon={<DirectionsCarFilledOutlinedIcon />}
            label="Car service "
            sx={{ color: "#0384fc" }}
          />
          <Tab
            icon={<ContentCutOutlinedIcon />}
            label="Beauty"
            sx={{ color: "#d45eff" }}
          />
          <Tab
            icon={<CelebrationOutlinedIcon />}
            label="Entertainment"
            sx={{ color: "#ffa214" }}
          />
          <Tab
            icon={<HealthAndSafetyOutlinedIcon />}
            label="Health Care"
            sx={{ color: "#f23f60" }}
          />
          <Tab
            icon={<EngineeringOutlinedIcon />}
            label="Services"
            sx={{ color: "#0384fc" }}
          />

          <Tab
            icon={<ConnectingAirportsOutlinedIcon />}
            label="Tourism"
            sx={{ color: "#ffa214" }}
          />
          <Tab
            icon={<SportsTennisOutlinedIcon />}
            label="Sports"
            sx={{ color: "#f23f60" }}
          />

          { <Tab icon={<PersonPinIcon />} label="NEARBY" /> }
        </Tabs> */}

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
          <Box
            style={{
              position: "relative",
              zIndex: "2",
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              padding: "24px 24px 24px",
              backgroundColor: "white",
              borderRadius: "32px 32px 32px 32px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: "10px",
              }}
            >
              {
                !isBusinessesDataLoading && (
                  <>
                    {/* businessesData.data.map((business) => ( */}
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        flexFlow: "column nowrap",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          overflow: "hidden",
                          backgroundColor: "#f2f2f2",
                          borderRadius: "18px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "200px",
                            padding: "10px 10px 10px",
                            backgroundImage: `url(${businessIMG})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundBlendMode: "multiply",
                          }}
                        >
                          <Avatar
                            alt="Business Logo"
                            src={businessLOGO}
                            sx={{
                              position: "relative",
                              height: "auto",
                              border: "15px solid white",
                              width: "40%",
                              aspectRatio: "1/1",
                            }}
                          />
                        </div>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "15px",
                            // justifyContent: "center",
                            // alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            component="div"
                            color="#488afa"
                            sx={{ mb: 0 }}
                          >
                            CookingPal
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0 }}
                          >
                            Cooking Supplies
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* next card */}

                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        flexFlow: "column nowrap",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          backgroundColor: "#f2f2f2",
                          borderRadius: "18px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "200px",
                            padding: "10px 10px 10px",
                            backgroundImage: `url(${businessIMG2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundBlendMode: "multiply",
                          }}
                        >
                          <Avatar
                            alt="Business Logo"
                            src={businessLOGO2}
                            sx={{
                              height: "auto",
                              border: "15px solid white",
                              width: "40%",
                              aspectRatio: "1/1",
                            }}
                          />
                        </div>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "15px",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            component="div"
                            color="#488afa"
                            sx={{ mb: 0 }}
                          >
                            CycleBoard
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0 }}
                          >
                            Electric Scooters
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </>
                )
                // ))
              }
            </div>
          </Box>
          {!isBusinessesDataLoading &&
            businessesData.data.map((business) => (
              <Grid key={business.id}>
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

      {/* <Container> Add the map component for Vancouver here </Container> */}
    </div>
  );
};
export default LandingPage;
