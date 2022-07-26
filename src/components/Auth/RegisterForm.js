import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../../services/registerUserService";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./style.css";
import { CustomErrorMessage } from "../ErrorMessage/CustomErrorMessage";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const signUpSchema = Yup.object().shape({
  nick_name: Yup.string()
    .min(3, "* Too Short!")
    .max(100, "* Too Long!")
    .required("* Field required"),

  email: Yup.string()
    .required("* Field required")
    .email("* Invalid email or wrong format")
    .min(6, "* Too Short!")
    .max(100, "* Too Long!"),

  password: Yup.string()
    .required("* Field required")
    .matches(lowercaseRegex, "* One lowercase required")
    .matches(uppercaseRegex, "* One uppercase required")
    .matches(numericRegex, "* One number required")
    .min(8, "* Minimum 8 characters")
    .max(20, "* Too long"),
    
  bio: Yup.string()
    .min(10, "* Too Short!")
    .max(200, "* Too Long!"),

});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <section>
      <Formik
        initialValues={{
          email: "",
          password: "",
          nick_name: "",
          bio: "",
          avatar: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={async (values, { resetForm }) => {
          const rebuildData = (values) => {
            let formData = new FormData();
            formData.append("nick_name", values.nick_name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            if (values.bio !== "") {
              formData.append("bio", values.bio);
            }
            if (values.avatar !== "") {
              formData.append("avatar", values.avatar);
            }
            return formData;
          };
          const data = rebuildData(values);
          try {
            await registerUserService({ data });
            resetForm();
            Swal.fire({
              text: "Check your email to verify your account",
              icon: "success",
              showCloseButton: true,
              showConfirmButton: false,
              html: `<a href="https://www.google.com/gmail/" target="_blank">Activate your account now!</a>`,
            });
            navigate("/login");
          } catch (error) {
            setError(error.message);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <div>
                <label htmlFor="nick">Nick name</label>
                <Field
                  id="nick_name"
                  name="nick_name"
                  placeholder="Enter your nickname"
                />
                <ErrorMessage name="nick_name">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="Enter your email" />
                <ErrorMessage name="email">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="bio">Bio</label>
                <Field id="bio" name="bio" placeholder="Things about you" />
                <ErrorMessage name="bio">
                  {(msg) => <p className="error">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={(event) => {
                    setFieldValue("avatar", event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <button type={"submit"}>Create profile</button>
          </Form>
        )}
      </Formik>
      {error && <CustomErrorMessage error={error} />}
    </section>
  );
};