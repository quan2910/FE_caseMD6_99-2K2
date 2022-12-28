import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../service/userService";
import "../../src/style/loginCSS.css"


function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlerLogin = async (value) => {
        let checkLogin = await dispatch(login(value))
        if (checkLogin.payload.mess =="sai tài khoản") {
           alert('Tài khoản hoặc mật khẩu sai')
        } else {
            alert("Đăng nhập thành công ")
            navigate('/home')
        }
    }
    const user = useSelector(state => {
        console.log(state)
        return state.user
    })

    return (
        <div>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <Formik initialValues={{
                        username: "",
                        password: ""
                    }}
                    onSubmit={(values) => {
                        handlerLogin(values).then()
                    }}>
                        <Form action="#">
                            <h1>Login</h1>
                            <br/>
                            <Field type="text" name={"username"} placeholder="Username"/>
                            <Field type="password" name={"password"} placeholder="Password"/>
                            <br/>
                            <button>Login</button>
                        </Form>
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