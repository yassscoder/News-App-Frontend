import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/loginService";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {CustomErrorMessage} from "../ErrorMessage/CustomErrorMessage";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./style.css";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    //.lowercase()
    .min(6, "* Too Short!")
    .max(100, "* Too Long!")
    .email("* Invalid email or wrong format")
    .required("* Field required"),

  password: Yup.string()
    .matches(lowercaseRegex, "* One lowercase required")
    .matches(uppercaseRegex, "* One uppercase required!")
    .matches(numericRegex, "* One number required!")
    .min(8, "* Minimum 8 characters required!")
    .max(20, "* Too long")
    .required("* Field required"),
});

export const LoginForm = () => {
  const { setToken } = useUserTokenContext();
  //const [sendForm, changeFormToSend] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <section>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}

        validationSchema={loginSchema}

        onSubmit={async (values, { resetForm }) => {
          try{ 
          const token= await loginService(values);
          setToken(token);
          resetForm();
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
        {() => (
          <Form>
            <div>
              <div>
                <label htmlFor="email">Email:</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Write yor email address..."
                />
                <ErrorMessage name="email">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Write your password..."
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>
            </div>

            <button type={"submit"}>Login</button>
          </Form>
        )}
      </Formik>
      {error && <CustomErrorMessage error={error} />}
    </section>
  );
};