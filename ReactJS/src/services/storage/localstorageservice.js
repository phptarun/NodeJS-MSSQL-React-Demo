const getService = {};
getService.getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

getService.setToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

getService.getRefreshToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

getService.unsetToken = () => {
  localStorage.setItem("accessToken", "");
};

export default getService;
