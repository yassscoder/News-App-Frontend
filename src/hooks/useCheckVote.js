import { useState, useEffect } from "react";

export const useCheckVote = (idPost, token) => {
    const [currentVote, setCurrentVote] = useState(null); 
    const [error, setError] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(

                    `${process.env.REACT_APP_BASE_URL_POSTS}/checkVote/${idPost}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const body = await res.json();
                if (res.ok) {
                    setCurrentVote(body.data.currentVote);
                } else {
                    throw new Error(body.message);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        token && fetchData();
    }, [token, idPost]);

    return { currentVote, setCurrentVote, error };
};


