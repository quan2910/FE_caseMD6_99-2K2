import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import "../../style/loginCSS.css"
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {changePassword} from "../../service/userService";
import Swal from 'sweetalert2'
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
        return state.user.currentUser.user.authenticUser[0].idUser
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePassword =async (values,resetForm)=>{
        let data = await dispatch(changePassword({...values, idUser}))
        if(data.payload.user.check) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Change Password Success !',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(async ()=>{
                clearTimeout();
                    navigate('/home')
            },1600)

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'incorrect password',
            })
            resetForm()
        }
    }

    return (
        <div style={{marginTop: 35}}>
            <div className="container" id="container" style={{width: 700}}>
                <div>
                    <Formik validationSchema={SignupSchema} initialValues={{
                        oldPassword: "",
                        newPassword: ""
                    }}onSubmit={async (values,{resetForm}) => {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handlePassword(values,resetForm)
                            }
                        })
                    }}>
                        {({errors, touched}) =>(
                            <Form>
                                <h3 style={{color: "black", marginTop: 75}}>Change Password</h3>
                                <br/>
                                <Field type="password" name={"oldPassword"} placeholder="OldPassword"
                                       style={{backgroundColor: "#eee", width: 500}}/>
                                {errors.oldPassword && touched.oldPassword ? (
                                    <span style={{color:"red"}}>{errors.oldPassword}</span>
                                ) : null}
                                <Field type="password" name={"newPassword"} placeholder="NewPassword"
                                       style={{backgroundColor: "#eee", width: 500}}/>
                                {errors.newPassword && touched.newPassword ? (
                                    <span style={{color:"red"}}>{errors.newPassword}</span>
                                ) : null}
                                <Field type="password" name={"rePassword"} placeholder="Re-NewPassword"
                                       style={{backgroundColor: "#eee", width: 500}}/>
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