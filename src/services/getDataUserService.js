export const getDataUserService = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_USERS}/get/myprofile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await response.json();

  if (!response.ok) {
    console.log("error data user service")
    throw new Error(body.message);
  }
  return body.data;
};
