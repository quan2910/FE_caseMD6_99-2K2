import React from 'react';
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../service/userService";
import "../../src/style/loginCSS.css"


function Register(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = async (value) => {
        console.log(value)
        if (value.rePassword != value.password) {
            alert('Mật khẩu không trùng khớp !!')
        } else {
            let newUser = {username: value.username, password: value.password}
            console.log(newUser)
            let mess = await dispatch(register(newUser))
            console.log(mess.payload.mess)
            if (value.username == "") {
                alert("Vui lòng nhập đủ thông tin !")
            } else if (value.password == "") {
                alert("Vui lòng nhập đủ thông tin !")
            } else if (value.rePassword == "") {
                alert("Vui lòng nhập đủ thông tin !")
            }else {
                if (mess.payload.mess == 'Tài khoản đã tồn tại') {
                    alert(mess.payload.mess)
                } else {
                    alert('Tạo thành công !!')
                    navigate("login")
                }
            }
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
                            <Link to={"login"}>
                                <button className="ghost" id="signIn">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="form-container sign-in-container">
                    <Formik initialValues={{
                        username: "",
                        password: "",
                        rePassword: ""

                    }} onSubmit={async (values, {resetForm}) => {
                        await handleRegister(values)
                        resetForm()
                    }}>
                        <Form action="#">
                            <h1>Register</h1>
                            <br/>
                            <Field type="text" name={"username"} placeholder="Name"/>
                            <Field type="password" name={"password"} placeholder="Password"/>
                            <Field type="password" name={"rePassword"} placeholder="Re-Password"/>
                            <br/>
                            <button>Register</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Register;