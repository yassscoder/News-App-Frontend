import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

function validateNick(value) {
    let error;
    if (!value) {
      error = "Required field";
    } else if (!/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{3,100}$/i.test(value)) {
      error = 'Nick name must be between 3 and 100 characters';
    }
    return error;
  }

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required field";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Required field";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/i.test(value)) {
    error = "Password must contain at least one letter and one number (between 8-20 characters).";
  }
  return error;
}

function validateBio(value) {
    let error;
    if (!value) {
      error = "Required field";
    } else if (!/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{10,200}$/i.test(value)) {
        error = 'Bio must be between 10 and 100 characters';
    }
    return error;
  }
export const RegisterUserForm = (props) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to="/" />;
  }
 
  return (
    <div className="container__form">
      <div className="post__form">
        <Formik
          initialValues={{
            email: "",
            password: "",
            nickname: "",
            bio: "",
          }}
        >
          {({ errors }) => (
            <Form>
                 <label htmlFor="nickname">Nick name</label>
              <Field
                id="nickname"
                name="nickname"
                placeholder="Enter your nickname"
                validate={validateNick}
              />
              {errors.nickname}  
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Enter your email"
                validate={validateEmail}
              />
              {errors.email}

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="Enter your password"
                validate={validatePassword}
              />
              {errors.password}

              <label htmlFor="bio">Bio</label>
              <Field
                id="bio"
                name="bio"
                placeholder="Things about you"
                validate={validateBio}
              />
              {errors.bio}

              <button type={"submit"}>Create post</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
