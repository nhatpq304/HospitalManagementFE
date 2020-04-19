const baseURL = "https://hospital-myn-be.herokuapp.com";
const apis = {
  login: `${baseURL}/api/auth/login`,
  getLoggedAccount: `${baseURL}/api/auth/user`,

  // Users
  getUser: `${baseURL}/api/auth/users/{id}`,
  getAllUsers: `${baseURL}/api/auth/users`,
  saveUser: `${baseURL}/api/auth/users`,
  updateUser: `${baseURL}/api/auth/users/{id}`,

  //Media
  saveMedia: `${baseURL}/api/auth/media`,
  delete: `${baseURL}/api/auth/media/{id}`,
};
export default apis;
