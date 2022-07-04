import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";

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
  } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/i.test(value)) {
    error = "Password must contain at least one letter and one number.";
  }
  return error;
}

export const LoginForm = (props) => {
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
          }}
        >
          {({ errors }) => (
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="Enter your email"
                validate={validateEmail}
              />
              {errors.email}

              <label htmlFor="password">Opening line</label>
              <Field
                id="password"
                name="password"
                placeholder="Enter your password"
                validate={validatePassword}
              />
              {errors.password}

              <button type={"submit"}>Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};