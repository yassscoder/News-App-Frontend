export const getLatestPostsEndpoint = () =>
  `${process.env.REACT_APP_BASE_URL_POSTS}/get/latestPosts`;

export const getPostsByTopic = (topic) =>
  `${process.env.REACT_APP_BASE_URL_POSTS}/${topic}`;

  export const getPostsByDateEndpoint = (selectedDate) =>
  `${process.env.REACT_APP_URL_DATE}/${selectedDate}`;

  export const getPostsByUser = (id)=> `${process.env.REACT_APP_BASE_URL_POSTS}/allPosts/${id}`;
  export const getDataProfileUser=()=>`${process.env.REACT_APP_BASE_URL_USERS}/get/myprofile`;
  export const getPostById = (id)=> `${process.env.REACT_APP_BASE_URL_POSTS}/singlePost/${id}`
