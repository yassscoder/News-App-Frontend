import {useParams} from "react-router-dom";
import {EditPostForm} from "../../components/EditPostForm/EditPostForm";
import {getPostById} from "../../API";
import {useFetch} from "../../hooks/useFetch";
import { CustomErrorMessage } from "../../components/ErrorMessage/CustomErrorMessage";

export const EditPost = () => {
    const {id} = useParams();
    const singlePostEndpoint = getPostById(id);
    const {data: post, error} = useFetch(singlePostEndpoint);

    return (
        <section>
            <h2>Edit Post</h2>
            {post && <EditPostForm post={post}/>}
            {error && <CustomErrorMessage error={error} />}
        </section>
    )
}