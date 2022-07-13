import { useState, useEffect } from "react";

export const useCheckLike = (idPost, token) => {
    const [didUserLikeEntry, setDidUserLikeEntry] = useState(null); /*si recargo pagina no me guarda valor voto*/
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(

                    `${process.env.REACT_APP_API_URL}/checkVote/${idPost}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const body = await res.json();
                console.log(body)
                if (res.ok) {
                    setDidUserLikeEntry(body.data.didUserVote);
                } else {
                    throw new Error(body.message);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        token && fetchData();
    }, [token, idPost]);

    return { didUserLikeEntry, setDidUserLikeEntry, error };
};


