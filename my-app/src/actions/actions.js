// actionPromise:
export const actionPending = (name) => ({
  type: "PROMISE",
  status: "PENDING",
  name,
});
export const actionFulfilled = (name, payload) => ({
  type: "PROMISE",
  status: "FULFILLED",
  name,
  payload,
});
export const actionRejected = (name, error) => ({
  type: "PROMISE",
  status: "REJECTED",
  name,
  error,
});

// authReducer:
export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

// actionInfoAboutUser
export const actionInfoAboutUser = (data) => ({
  type: "INFO_ABOUT_USER",
  data,
});

// actionCreatePost
export const actionCreatePost = (text, images) => ({
  type: "CREATE_POST",
  text,
  images,
});

// actionOnePost
export const actionOnePost = (data) => ({ type: "ONE_POST", data });

//экшен actionAllPosts
export const actionAllPosts = (data, count) => ({
  type: "ALL_POSTS",
  data,
  count,
});

// actionCreateComment
export const actionCreateComment = (data) => ({ type: "CREATE_COMMENT", data });

// actionFollowers
export const actionFollowers = (data) => ({ type: "FOLLOWERS", data });

// actionFollowing
export const actionFollowing = (data) => ({ type: "FOLLOWING", data });

// actionFollowing
export const actionPostAdd = (newPost) => ({ type: "POST_ADD", newPost });
const actionPostDel = () => ({ type: "POST_DEL" });
