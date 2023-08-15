import { Typography, Grid, Box, Rating, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import sampleIMG from "../mock_data/images/doge-meme-22.jpg";
import backIMG from "../mock_data/images/websback.jpg";
import { useNavigate } from "react-router-dom";
import { useGetBusinesses } from "../queries/business";
import businessIMG from "../mock_data/images/cookingpal.jpg";
import businessLOGO from "../mock_data/images/cooklogo.jpg";
import businessIMG2 from "../mock_data/images/cycleboard.jpg";
import businessLOGO2 from "../mock_data/images/cyclelogo.jpg";
import AWS from "aws-sdk";
const MainPage: React.FC = () => {
  const { data: businessesData, isLoading: isBusinessesDataLoading } =
    useGetBusinesses();

  const navigate = useNavigate();
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    // Configure AWS credentials
    AWS.config.update({
      accessKeyId: "AKIA4WJT2OPPRZQTSXFI",
      secretAccessKey: "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",
      region: "ca-central-1",
    });

    // Create S3 instance
    const s3 = new AWS.S3();

    // Specify the S3 bucket and object key
    const bucketName = "engagesense-test";
    const objectKey = "uploads/default-business.png";

    // Fetch the image data
    s3.getObject({ Bucket: bucketName, Key: objectKey }, (err, data) => {
      if (err) {
        console.error("Error fetching image:", err);
      } else {
        const uint8Array = new Uint8Array(data.Body as ArrayBuffer);
        const byteArray = Array.from(uint8Array);
        const imageBase64 = btoa(
          byteArray.map((byte) => String.fromCharCode(byte)).join("")
        );
        setImageData(`data:image/jpeg;base64,${imageBase64}`);
      }
    });
  }, []);

  return (
    <div
      style={{
        background: "#f2f2f2",
        overflowY: "auto",
        height: "100vh",
        padding: "20px",
      }}
    >
      {/* <div>
        <h2>Display Image using getObject</h2>
        {imageData && <img src={imageData} alt="Displayed Image" />}
      </div> */}
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

      <div>
        <h2>Display Image using getObject</h2>
        {imageData && <img src={imageData} alt="Displayed Image" />}
      </div>

      <Box
        sx={{
          py: 4,
          paddingLeft: "0",
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
