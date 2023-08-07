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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sampleIMG from "../mock_data/images/doge-meme-22.jpg";
import backIMG from "../mock_data/images/websback.jpg";
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
    <>
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          position: "relative",
          userSelect: "none",
          // color: "white",
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
            // padding: "20px",
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
              filter: "brightness(0.9)",
              backgroundBlendMode: "multiply",
            }}
          />
        </div>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "15px" }}
        >
          <Typography
            variant="h6"
            component="div"
            // sx={{ flexGrow: 1, color: "black" }}
            sx={{ position: "relative", color: "white" }}
          >
            EngageSense
          </Typography>
          <Box sx={{ position: "relative", mb: "100px" }}>
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
          </Box>
        </Box>
        {/* <h5> Earn cash for engaging with your favourite business!</h5> */}
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

      <Container
        sx={{
          py: 4,
          paddingLeft: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            color="text.secondary"
            sx={{ paddingLeft: "20px" }}
          >
            Suggested Businesses
          </Typography>

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
      </Container>

      {/* <Container> Add the map component for Vancouver here </Container> */}
    </>
  );
};
export default LandingPage;
