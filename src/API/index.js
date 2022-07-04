export const getLatestPostsEndpoint = () =>
  `${process.env.REACT_APP_BASE_URL_POSTS}/get/latestPosts`;

export const getPostsByTopic = (topic) =>
  `${process.env.REACT_APP_BASE_URL_POSTS}/${topic}`;

  export const getPostsByDateEndpoint = (selectedDate) =>
  `${process.env.REACT_APP_URL_DATE}/${selectedDate}`;
