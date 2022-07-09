export const editPostService = async (token, idPost) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_POSTS}/${idPost}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await response.json();
  console.log("body response");
  console.log(body);
  if (!response.ok) {
    throw new Error(body.message);
  }
};
