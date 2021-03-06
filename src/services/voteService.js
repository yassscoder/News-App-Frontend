const votePostService = async ({id, myVote, token}) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL_POSTS}/vote/${id}`,
            {
                method: "POST",
                body:  JSON.stringify(myVote),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            );
            const body = await response.json();
            if (!response.ok) {
                throw new Error(body.message);
            }
            return body;
        }catch (error){
            console.log(error)}
    }

 const removeVotePostService = async ({id, token})=>{
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL_POSTS}/vote/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
    
                },
            }
        );
        const body = await response.json();
        if (!response.ok) {
            throw new Error(body.message);
        }
        return body;
    }

  const switchVote = async ({id, token, myVote}) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL_POSTS}/vote/${id}`,
            {
                method: "PATCH",
                body:  JSON.stringify(myVote),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const body = await response.json();
        if (!response.ok) {
            throw new Error(body.message);
        }
        return body;
    }catch (error){
        console.log(error)}
}

export {votePostService, removeVotePostService,switchVote}