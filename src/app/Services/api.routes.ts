const baseURL = "https://hospital-myn-be.herokuapp.com";
const apis = {
  login: `${baseURL}/api/auth/login`,
  getLoggedAccount: `${baseURL}/api/auth/user`,

  // Users
  getAllUsers: `${baseURL}/api/auth/users`,
  saveUser: `${baseURL}/api/auth/users`,

  //Media
  saveMedia: `${baseURL}/api/auth/media`,
};
export default apis;
