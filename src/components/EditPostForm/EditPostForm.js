import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {editPostService} from "../../services/editPostService";
import {CustomErrorMessage} from "../ErrorMessage/CustomErrorMessage";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import * as Yup from "yup";
import "../Auth/style.css";

const topics = ["sports", "politics", "finances"];

const createPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "* Too Short!")
    .max(100, "* Too Long!")
    .required("* Field required"),

  opening_line: Yup.string()
    .min(6, "* Too Short!")
    .max(200, "* Too Long!")    
    .required("* Field required"),

  text: Yup.string()
    .min(6, "* Too Short!")
    .max(500, "* Too Long!")
    .required("* Field required"),

});

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
  
  const {token}= useUserTokenContext();
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
  return (
    <section>
      <Formik
        initialValues={{
            title: initialTitle, opening_line: initialOpeningLine, text: initialText, topic: initialTopic,
            photo: initialPhoto,
        }}
        validationSchema={createPostSchema}
        onSubmit={async (values, { resetForm }) => {
          const rebuildData = (values) => {

            let formData = new FormData();
            formData.append("title", values.title);
            formData.append("opening_line", values.opening_line);
            formData.append("text", values.text);
            formData.append("topic", values.topic);

            if (values.photo !== initialPhoto) {
                formData.append("photo", values.photo);
            }
            return formData;
        };
        const data = rebuildData(values);
        try {
            await editPostService(token, idPost, data);
           // await createPostService({data, token});
            resetForm();
            navigate("/")
        } catch (error) {
            setError(error.message)
        }

    }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <div>
                <label htmlFor="title">Title:</label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Write the title of your post."
                />
                <ErrorMessage name="title">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="opening_line">Opening line:</label>
                <Field
                  id="opening_line"
                  name="opening_line"
                  placeholder="Write an opening line."
                />
                <ErrorMessage name="opening_line">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="text">Text:</label>
                <Field
                  id="text"
                  name="text"
                  placeholder="Write the text of your post."
                />
                <ErrorMessage name="text">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="topic">Topic:</label>
                <Field
                  id="topic"
                  name="topic"
                  placeholder="Sports, politics or finances"
                  validate={validateTopic}
                />
                <ErrorMessage name="topic">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="photo">Post photo</label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("photo", event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <button type={"submit"}>Save changes</button>
          </Form>
        )}
      </Formik>
      {error && <CustomErrorMessage error={error}/>}
    </section>
  );
};