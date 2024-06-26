import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate  } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={goToDashboard}>
              Back Home
            </Button>
          </Grid>
          <Grid xs={6}>
            <img src="404.jpg" alt="" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PageNotFound;
