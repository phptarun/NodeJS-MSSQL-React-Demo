import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="/"> */}
      NodeJS, MsSQL & React Demo
      {/* </Link> */} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = (props) => {
  return (
    <Box
      component="div"
      sx={{
        mt: 1,
        bgcolor: "lightgray",
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "5px 0 5px 0",
      }}
    >
      <Copyright {...props} />
    </Box>
  );
};

export default Footer;
