const baseURL = "https://hospital-myn-be.herokuapp.com";
const apis = {
  login: `${baseURL}/api/auth/login`,
  getLoggedAccount: `${baseURL}/api/auth/user`,
  getAllUsers: `${baseURL}/api/auth/users`
};
export default apis;
