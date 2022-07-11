export const registerUserService = async ({data}) => {
    const response = await fetch(
        `${process.env.REACT_APP_BASE_URL_USERS}/signup`,
        {
            method: "POST",
            body: data,
        });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body.data;
};