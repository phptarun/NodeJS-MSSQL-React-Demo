import * as React from "react";
import axios from "axios";
import LocalStorageService from "./services/storage/localstorageservice";
// import { useHistory } from "react-router-dom";
import consts from "./const";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
// import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import moment from "moment";

(() => {
  // let history = useHistory();
  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = LocalStorageService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  //Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      // console.log("originalRequest ", originalRequest);
      // console.log("`${consts.API_URL}/login` ", `${consts.API_URL}/login`);
      if (error.response.status === 401) {
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = LocalStorageService.getRefreshToken();
        return axios
          .post(`${consts.API_URL}/login`, {
            refresh_token: refreshToken,
          })
          .then((res) => {
            if (res.status === 201) {
              LocalStorageService.setToken(res.data);
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + LocalStorageService.getAccessToken();
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
})();

const helper_functions = {};

const Helper = () => {
  const [showMsg, setShowMsg] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("warning");

  helper_functions.showMessage = (message1, severity1 = "warning") => {
    setMsg(message1);
    setSeverity(severity1);
    setShowMsg(true);
    setTimeout(() => {
      setShowMsg(false);
    }, 11000);
  };

  return (
    <Box
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 999,
        position: "absolute",
        top: 0,
        right: 0,
        display: showMsg ? "block" : "none",
      }}
    >
      <Stack>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowMsg(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Stack>
    </Box>
  );
};

function createMarkup(html) {
  return { __html: html };
}

helper_functions.renderHtml = (html) => {
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
};

helper_functions.getDate = (ts = "") => {
  if (ts) {
    return moment(ts).format("DD/MM/YYYY");
  } else {
    return ts;
  }
};

helper_functions.getTime = (ts = "") => {
  if (ts) {
    return moment(ts).format("h:mm:ss A");
  } else {
    return ts;
  }
};

global.helper_functions = helper_functions;

export default Helper;
