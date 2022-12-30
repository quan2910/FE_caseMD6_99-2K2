import {Link, useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import React from "react";
import "../../style/loginCSS.css"
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {changePassword} from "../../service/userService";


export default function UpdateProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div style={{marginTop: 70}}>
            <div className="container" id="container">
                <div>
                    <Formik>
                            <Form>
                                <h1 style={{color: "black", marginTop: 100}}>Update Profile</h1>
                                <br/>
                                <Field type="text" name={"username"} placeholder="Username"
                                       style={{backgroundColor: "lightgrey"}}/>

                                <Field type={"file"} name={"avatar"}></Field>

                                <Field type="text" name={"address"} placeholder="Address"
                                       style={{backgroundColor: "lightgrey"}}/>

                                <Field type="number" name={"age"} placeholder="Age"
                                       style={{backgroundColor: "lightgrey"}}/>

                                <select name={"sex"}
                                        style={{backgroundColor: "lightgrey"}}>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Other</option>
                                </select>
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