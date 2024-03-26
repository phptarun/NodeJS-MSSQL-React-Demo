import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Footer from "../footer";
import Header from "../header";
import axios from "axios";
import consts from "../../const";
import DataView from "../DataGrid/DataView";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userName",
      headerName: "User Name",
      width: 150,
      // editable: true,
    },
  ];

  const [data, setData] = React.useState([]);
  const gitUserInfo = () => {
    return axios.get(`${consts.API_URL}/user`).then((response) => {
      if (response?.data?.length) {
        setData(response.data);
      } else {
        setData([]);
      }
    });
  };

  React.useEffect(() => {
    gitUserInfo();
  }, []);
  
  return (
    <React.Fragment>
      <Header />
      <Box sx={{ flexGrow: 1, pt: 11, m: 1, mb: 5 }}>
        <Container
          maxWidth="fullWidth"
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "0.5rem",
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <Item sx={{ boxShadow: "none" }}>
                <DataView columns={columns} rows={data} />
              </Item>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </React.Fragment>
  );
}
