export const createPostService = async ({ title, opening_line, text, topic, token}) => {
   
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL_POSTS}/allPosts`,
      {
        method: "POST",
        body: JSON.stringify({ title, opening_line, text, topic}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }
    );
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body.data;
  };