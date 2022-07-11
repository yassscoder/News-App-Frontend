import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {Field, Form, Formik} from "formik";

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {editPostService} from "../../services/editPostService";
//REACT_APP_BASE_URL_POSTS=>http://localhost:4000/api/v1/posts/singlePost/1  get fetch 1º

const topics = ["sports", "politics", "finances"];

function validateTitle(value) {
    let error;
    if (!value) {
        error = "Required field";
    } else if (!/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{2,100}$/i.test(value)) {
        error = "Title must be between 2 and 100 characters.";
    }
    return error;
}

function validateOpeningLine(value) {
    let error;
    if (!value) {
        error = "Required field";
    } else if (!/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{6,200}$/i.test(value)) {
        error = "Opening Line must be between 6 and 200 characters.";
    }
    return error;
}

function validateText(value) {
    let error;
    if (!value) {
        error = "Required field";
    } else if (!/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{6,500}$/i.test(value)) {
        error = "Title must be between 6 and 500 characters.";
    }
    return error;
}

function validateTopic(value) {
    let error;
    if (!value) {
        error = "Required field";
    } else if (!topics.includes(value)) {
        error = "Topic must be sports, politics or finances.";
    }

    return error;
}
export const EditPostForm = ({post}) => {
    const {token, user} = useUserTokenContext()
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const {
        id: idPost,
        title: initialTitle,
        opening_line: initialOpeningLine,
        text: initialText,
        topic: initialTopic,
        photo: initialPhoto
    } = post;
    console.log(initialPhoto)
     return (
        <section>
            <Formik
                initialValues={{
                    title: initialTitle, opening_line: initialOpeningLine, text: initialText, topic: initialTopic,
                    photo: initialPhoto,
                }}
                onSubmit={async (values) => {
                    const rebuildData = (values) => {

                        let formData = new FormData();
                        formData.append("title", values.title);
                        formData.append("opening_line", values.opening_line);
                        formData.append("text", values.text);
                        formData.append("topic", values.topic);

                        if(values.photo !== initialPhoto) {
                            formData.append("photo", values.photo);
                        }

                        return formData;
                    };
                    const data = rebuildData(values);
                    try {
                        await editPostService(token, idPost, data);
                        navigate("/home")
                    } catch (error) {
                        setError(error.message)
                    }

                }}
            >
                {({errors, isSubmitting, values, setFieldValue}) => (<Form>
                    <label htmlFor="title">Title</label>
                    <Field
                        id="title"
                        name="title"
                        placeholder="Write the title of your post."
                        validate={validateTitle}
                    />
                    {errors.title}

                    <label htmlFor="opening_line">Opening line</label>
                    <Field
                        id="opening_line"
                        name="opening_line"
                        placeholder="Write an opening line."
                        validate={validateOpeningLine}
                    />
                    {errors.opening_line}

                    <label htmlFor="text">Text</label>
                    <Field
                        id="text"
                        name="text"
                        placeholder="Write the text of your post."
                        validate={validateText}
                    />
                    {errors.text}

                    <label htmlFor="topic">Topic</label>
                    <Field
                        id="topic"
                        name="topic"
                        placeholder="Sports, politics or finances"
                        validate={validateTopic}
                    />
                    {errors.topic}

                    <label htmlFor="photo">Photo post</label>
                    <input
                        id="photo"
                        name="photo"
                        type="file"
                        onChange={(event) => {
                            setFieldValue('photo', event.target.files[0]);
                        }}
                    />

                    <button type={"submit"} disabled={isSubmitting}>Edit post</button>
                </Form>)}
            </Formik>
        </section>
    )
}