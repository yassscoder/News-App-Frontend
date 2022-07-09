export const deletePostService = async (token, idPost) => {
   
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_POSTS}/delete/${idPost}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const body = await response.json();
   console.log(body)
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.message;
};
