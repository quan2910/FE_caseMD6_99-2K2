import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../service/userService";
import "../../style/loginCSS.css"
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {showDetailWallet} from "../../service/walletService";
const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(6, "Username needs than 6 characters!")
        .max(50, "Username needs under 50 characters!")
        .required("You must fill in the field"),
    password: Yup.string()
        .min(6, "Your password must be least 6 characters")
        .max(50, "Your password must be under 50 characters")
        .required("You must fill in the field"),

});

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showToastMessage =async () => {
        await toast.success('Successful login!', {
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
        await toast.error('Incorrect account or loss of aperture!', {
            position: "top-center",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    };
    const handlerLogin = async (value,reset) => {
        let checkLogin = await dispatch(login(value))
        if (checkLogin.payload.mess =="sai tài khoản") {
          showToastMessage1()
            reset()
        } else {

            showToastMessage()
            setTimeout(async ()=>{

                clearTimeout();
                if(checkLogin.payload.user.authenticUser[0].checkBegin==true){
                    let detailWallet = await dispatch(showDetailWallet(checkLogin.payload.user.authenticUser[0].idUser))
                    navigate('/home')
                }else {
                    navigate('/home/create-wallet')
                }
            },2790)


        }
    }
    const user = useSelector(state => {
        console.log(state)
        return state.user
    })

    return (
        <div style={{marginTop: 70}}>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <Formik validationSchema={SignupSchema} initialValues={{
                        username: "",
                        password: ""
                    }}
                    onSubmit={(values,{resetForm}) => {
                        handlerLogin(values,resetForm)
                    }}>
                        {({ errors, touched }) => (
                        <Form action="case6/src/pages/user/login#">
                            <h1 style={{color:"black"}}>Login</h1>
                            <br/>
                            <Field type="text" name={"username"} placeholder="Username"/>
                            {errors.username && touched.username ? (
                                <span style={{color:"red", paddingTop:"px"}}>{errors.username}</span>
                            ) : null}
                            <Field type="password" name={"password"} placeholder="Password"/>
                            {errors.password && touched.password ? (
                                <span style={{color:"red"}}>{errors.password}</span>
                            ) : null}
                            <br/>
                            <button>Login</button>
                            <ToastContainer />
                        </Form>
                        )}
                    </Formik>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <Link to={'register'}><button className="ghost" id="signUp">Register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;