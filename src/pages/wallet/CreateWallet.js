import {Link} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {ToastContainer} from "react-toastify";
import React from "react";
import "../../style/loginCSS.css"

export default function CreateWallet() {
    return (
        <div style={{marginTop: 70}}>
            <div className="container" id="container">
                <div  >
                    <Formik >
                            <form >
                                <h1 style={{color:"black", marginTop: 60}}>Create Wallet</h1>
                                <br/>
                                <input type="text" name={"username"} placeholder="Wallet Name" style={{backgroundColor: "lightgrey"}}/>

                                <input type="password" name={"password"} placeholder="Money" style={{backgroundColor: "lightgrey"}}/>

                                <select style={{border: 'none', color: "gray",marginTop: 10, width: 645, height: 44, backgroundColor: "lightgray"}} >
                                    <option selected >Open this select menu</option>
                                    <option value="1">Vietnam Dong</option>
                                    <option value="2">Dollar</option>
                                </select>
                                <br/>
                                <button>Create Wallet</button>
                            </form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}