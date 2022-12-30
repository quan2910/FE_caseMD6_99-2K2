import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import "../../style/loginCSS.css"
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../service/userService";

const SignupSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, "Your password must be least 6 characters")
        .max(50, "Your password must be under 50 characters")
        .required("You must fill in the field"),
    newPassword: Yup.string()
        .min(6, "Your password must be least 6 characters")
        .max(50, "Your password must be under 50 characters")
        .required("You must fill in the field"),
    rePassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Password does not match")
        .required("You must fill in the field")

});

export default function ChangePassword() {
    const idUser = useSelector(state => {
        console.log(state.user.currentUser.user.authenticUser[0].idUser)
        return state.user.currentUser.user.authenticUser[0].idUser
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showToastMessage = async () => {
        await toast.success(' Changed Password!', {
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

    return (
        <div style={{marginTop: 70}}>
            <div className="container" id="container">
                <div>
                    <Formik validationSchema={SignupSchema} initialValues={{
                        oldPassword: "",
                        newPassword: ""
                    }}onSubmit={async (values,{resetForm}) => {
                        let data = await dispatch(changePassword({...values, idUser}))
                        console.log("data",data)
                        if(data.payload.user.check) {
                            await showToastMessage();
                            navigate("/home")
                        } else {
                            alert(data.payload.mess)
                            resetForm()
                        }
                    }}>
                        {({errors, touched}) =>(
                            <Form>
                                <h1 style={{color: "black", marginTop: 100}}>Change Password</h1>
                                <br/>
                                <Field type="password" name={"oldPassword"} placeholder="OldPassword"
                                       style={{backgroundColor: "lightgrey"}}/>
                                {errors.oldPassword && touched.oldPassword ? (
                                    <span style={{color:"red"}}>{errors.oldPassword}</span>
                                ) : null}
                                <Field type="password" name={"newPassword"} placeholder="NewPassword"
                                       style={{backgroundColor: "lightgrey"}}/>
                                {errors.newPassword && touched.newPassword ? (
                                    <span style={{color:"red"}}>{errors.newPassword}</span>
                                ) : null}
                                <Field type="password" name={"rePassword"} placeholder="Re-NewPassword"
                                       style={{backgroundColor: "lightgrey"}}/>
                                {errors.rePassword && touched.rePassword ? (
                                    <span style={{color:"red"}}>{errors.rePassword}</span>
                                ) : null}
                                <br/>
                                <button>Save</button>
                                <ToastContainer/>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}