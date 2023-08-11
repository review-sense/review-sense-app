const internalApi = "https://localhost:8000/api";
const businesses = `${internalApi}/businesses`;
const comments = `${internalApi}/comments`;
const posts = `${internalApi}/posts`;
const user = `${internalApi}/user`;

export const apis = {
  getBusinesses: businesses + "/all-businesses",
  respondToFollowRequest: businesses + "/respond-follow-request",
  createComment: comments + "/create-comment",
  registerUser: user + "/register",
  loginUser: user + "/login",
};
