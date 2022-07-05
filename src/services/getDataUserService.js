export const getDataUserService = async (token) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_USERS}/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.data;
};
