export const editPostService = async (token, idPost, data) => {
    const response = await fetch(
        `${process.env.REACT_APP_BASE_URL_POSTS}/${idPost}`,
        {
            method: "PATCH",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
};
