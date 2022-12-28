import React from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../service/userService";
import "../../style/loginCSS.css"
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Username needs than 6 characters!")
        .max(50, "Username needs under 50 characters!")
        .required("You must fill in the field"),
    password: Yup.string()
        .min(6, "Your password must be least 6 characters")
        .max(50, "Your password must be under 50 characters")
        .required("You must fill in the field"),
    rePassword : Yup.string()
        .oneOf([Yup.ref('password')],"Password does not match")
        .required("You must fill in the field")

});
function Register(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showToastMessage =async () => {
        await toast.success(' Register successful!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    };

    const showToastMessage1 =async () => {
        await toast.error(' already existing accounts!', {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    };
    const handleRegister = async (value,reset) => {
            let newUser = {username: value.username, password: value.password}
            console.log(newUser)
            let mess = await dispatch(register(newUser))
                if (mess.payload.mess == 'Tài khoản đã tồn tại') {
                       await showToastMessage1()
                    reset()
                } else {
                  await  showToastMessage()
                    setTimeout(()=>{

                        clearTimeout();
                        navigate('/login')

                    },2790)
                }
    }
    return (
        <div>
            <div className="container" id="container">
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <Link to={"/"}>
                                <button  className="ghost" id="signIn">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"-40px"}} className="form-container sign-in-container">
                    <Formik validationSchema={SignupSchema} initialValues={{
                        username: "",
                        password: "",
                        rePassword: ""

                    }} onSubmit={async (values, {resetForm}) => {
                        await handleRegister(values,resetForm)

                    }}>
                        {({ errors, touched }) => (
                        <Form action="case6/src/pages/user/register#">
                            <h1 style={{color:"black"}}>Register</h1>
                            <br/>
                            <Field type="text" name={"username"} placeholder="Name"/>
                            {errors.username && touched.username ? (
                                <span style={{color:"red", paddingTop:"px"}}>{errors.username}</span>
                            ) : null}
                            <Field type="password" name={"password"} placeholder="Password"/>
                            {errors.password && touched.password ? (
                                <span style={{color:"red"}}>{errors.password}</span>
                            ) : null}
                            <Field type="password" name={"rePassword"} placeholder="Re-Password"/>
                            {errors.rePassword && touched.rePassword ? (
                                <span style={{color:"red"}}>{errors.rePassword}</span>
                            ) : null}
                            <br/>
                            <button>Register</button>
                            <ToastContainer />
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register;