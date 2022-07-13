import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginService } from "../../services/loginService";
import {useUserTokenContext} from "../../contexts/UserTokenContext"
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import Swal from "sweetalert2";

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

export const LoginForm = () => {

 const navigate = useNavigate();
 const [error, setError] = useState("");
  const { setToken } = useUserTokenContext();
  return (
    <div className="container__form">
      <div className="post__form">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            try{
            const token= await loginService(values);
            setToken(token)
                   Swal.fire({
                          title: 'Correct login',
                          showConfirmButton: false,
                          icon: 'success',
                          timer: '2000'
                      })

            navigate("/");
          }catch(error){
            setError(error.message)
          }
        }}
        >
          {({ errors, isSubmitting }) => (
            <Form>
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

              <button type={"submit"} disabled= {isSubmitting}>Login</button>
            </Form>
          )}
        </Formik>
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
};
