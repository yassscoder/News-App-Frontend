import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import "./Postform.css";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { createPostService } from "../../services/createPostService";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

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


export const NewPostForm = (props) => {
  const userContext= useUserTokenContext(); 
  const {token} = userContext;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /*validation photo!!!*/
  return (
    <div className="container__form">
      <div className="post__form">
        <Formik
          initialValues={{
            title: "",
            opening_line: "",
            text: "",
            topic: "",
          }}
          onSubmit={async (values) => {
            try {
            values.token= token;
            await createPostService(values);
             navigate("/home")
            }catch (error) {
              setError(error.message)
            }

          }}
        >
      
          {({ errors, isSubmitting  }) => (
            <Form>
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

              <Field
                 id="photo"
                 name="photo"
                 type="file"/>
                 
              <button type={"submit"} disabled= {isSubmitting}>Create post</button>
            </Form>
          )}
        </Formik>
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
};
