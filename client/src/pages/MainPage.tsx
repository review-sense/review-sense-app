import { Typography, Box, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import backIMG from "../mock_data/images/websback.jpg";
import { useNavigate } from "react-router-dom";
import { useGetBusinesses } from "../queries/business";
import AWS from "aws-sdk";
const MainPage: React.FC = () => {
  const [imageDataList, setImageDataList] = useState<string[]>([]);
  const [areBusinessImagesLoading, setAreBusinessImagesLoading] =
    useState(true);
  const { data: businessesData, isLoading: isBusinessesDataLoading } =
    useGetBusinesses();

  const navigate = useNavigate();

  const bucketName = "engagesense-test";

  const getImageFromS3 = async (bucketName, objectKey) => {
    try {
      // Configure AWS credentials
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: "ca-central-1",
      });

      // Create S3 instance
      const s3 = new AWS.S3();

      // Fetch the image data
      const data = await s3
        .getObject({ Bucket: bucketName, Key: objectKey })
        .promise();

      const uint8Array = new Uint8Array(data.Body as ArrayBuffer);
      const byteArray = Array.from(uint8Array);
      const imageBase64 = btoa(
        byteArray.map((byte) => String.fromCharCode(byte)).join("")
      );

      return `data:image/jpeg;base64,${imageBase64}`;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!isBusinessesDataLoading) {
      const fetchImages = async () => {
        const updatedImageDataList = await Promise.all(
          businessesData.data.map(async (business) => {
            const imageData = await getImageFromS3(bucketName, business.image);
            return imageData;
          })
        );

        setImageDataList(updatedImageDataList);
        setAreBusinessImagesLoading(false);
      };
      fetchImages();
    }
  }, [businessesData, isBusinessesDataLoading]);

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
              {!isBusinessesDataLoading &&
                !areBusinessImagesLoading &&
                businessesData.data.map((business, index) => (
                  <Box
                    key={index}
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
                          backgroundColor: "#2765cf",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundBlendMode: "multiply",
                        }}
                      >
                        <Avatar
                          alt="Business Logo"
                          src={imageDataList[index]}
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
                          {business.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0 }}
                        >
                          {business.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default MainPage;
