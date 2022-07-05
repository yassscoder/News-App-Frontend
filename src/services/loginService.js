export const loginService = async ({ email, password }) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL_USERS}/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body.token;
};
