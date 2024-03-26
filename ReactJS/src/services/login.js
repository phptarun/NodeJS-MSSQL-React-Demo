import axios from "axios";
import LocalStorageService from "./storage/localstorageservice";
import consts from "../const";

const loginService = {};

loginService.login = (payload = {}) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${consts.API_URL}/login`, payload)
      .then((response) => {
        if (response?.data?.status.toString() === "1") {
          LocalStorageService.setToken(response.data.data.accessToken);
          global.helper_functions.showMessage(
            "Logged in successfully",
            "success"
          );
          resolve(true);
        } else {
          global.helper_functions.showMessage(response.data.data.message);
          resolve(false);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  }).catch((err) => {
    console.log(err);
  });
};

export default loginService;
