import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useUserTokenContext} from "../../contexts/UserTokenContext"
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {registerUserService} from "../../services/registerUserService";

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
function validateBio(value){
    let error;
    if (value && !/^[A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ.-\u00f1\u00d1]{10,200}$/i.test(value)) {
        error = 'Nick name must be between 10 and 200 characters';
    }
    return error;
}

export const RegisterForm = (props) => {

    const navigate = useNavigate();
    const [error, setError] = useState("");




/*    if (bio) formData.append("bio", bio);
    if (image) {
        formData.append("picture", image);
    }
    console.log(formData);
    console.log(formData.name);*/
    return (
        <div className="container__form">
            <div className="post__form">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        nick_name: "",
                        bio: "",
                        avatar: "",
                    }}

                    onSubmit={async (values) => {
                        const rebuildData = (values) => {
                            console.log(values.email)
                            let formData = new FormData();
                            formData.append("email", values.email);
                            console.log(formData.get("email"))
                            formData.append("password", values.password);
                            formData.append("nick_name", values.nick_name);
                            if (values.bio!=="") formData.append("bio", values.bio);
                            if (values.avatar!== "") {
                                formData.append("avatar", values.avatar);
                            }
                            /*Object.keys(values).forEach(key => {
                                formData.append(key, values[key]);
                            });*/
                            console.log(formData.get("nick_name"))

                            return formData;
                        };
                        const data = rebuildData(values)
                        console.log(data.get("nick_name"))
                        console.log(data.get("avatar"))
                        console.log(data.get("bio"))
                        try{
                          //  await registerUserService(data);
                            console.log("redirigir a validar email")
                           // navigate("/validateEmail");
                        }catch(error){
                            setError(error.message)
                        }
                    }}
                >

                    {({ errors, isSubmitting , values, setFieldValue}) => (
                        <Form>
                            <label htmlFor="nick_name">Nick name</label>
                            <Field
                                id="nick_name"
                                name="nick_name"
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

                            <label htmlFor="avatar">Avatar</label>
                            <Field
                                type="file"
                                name="avatar"
                                onChange={(event) => {
                                    setFieldValue('avatar', event.currentTarget.files[0]);
                                }}
                               /* placeholder="Things about you"
                                validate={validateBio}*/
                            />
                            {/*{errors.bio}*/}
                            <button type={"submit"}>Create profile</button>
                        </Form>
                    )}
                </Formik>
                {error && <ErrorMessage error={error} />}
            </div>
        </div>
    );
};

/*{({ errors, isSubmitting , values, setFieldValue}) => (* en linea 103/ }*/
