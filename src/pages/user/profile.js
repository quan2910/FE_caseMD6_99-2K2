import React, {useEffect} from 'react';
import "../../style/profileCSS.css"
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import {showDetailWallet} from "../../service/walletService";
import {findById, saveAvatar, updateProfile} from "../../service/userService";
import Swal from 'sweetalert2'

const Profile = () => {
    let user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const dispatch = useDispatch()
    let editProfile = async (values) => {
        values = {...values, idUser: user.idUser}
        await dispatch(updateProfile(values))
        await dispatch(findById(user.idUser))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
        })
    }
    useEffect(() => {
        (async () => {
            await dispatch(findById(user.idUser))
        })()
    }, [user])
    let saveIcon = async (e) => {
        const formData = new FormData();
        formData.append('File', e.target.files[0]);
        formData.append('idUser', user.idUser);
        await dispatch(saveAvatar(formData))
        await dispatch(findById(user.idUser))
    }

    return (
        <div className="container" style={{marginTop: 0}}>
            <div className="main-body">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                </nav>
                {/* /Breadcrumb */}
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card" style={{height: 460}}>
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center"
                                     style={{height: "150px", width: "150px", borderRadius: '50%', overflow: 'hidden', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                                    <img style={{height: "150px", width: "150px"}}
                                         src={user.avatar == "" ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar}
                                         alt="Admin"
                                         className="rounded-circle"
                                         width={150}
                                         onClick={() => {
                                         }}
                                    ></img>
                                    <div>

                                        <p style={{position: "relative", top: -45, background: 'rgba(0,0,0,0.3)'}}>
                                            <img width={'25px'}
                                                 src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cloud-up-icon.png"
                                                 alt=""/>
                                        </p>
                                        <input type={"file"} style={{
                                            opacity: 0, position: "relative", top: -120
                                        }} onChange={async (event) => {
                                            await saveIcon(event)
                                        }}/>
                                    </div>
                                </div>

                                <div className="mt-5 text-center">
                                    <p>{user.username}</p>
                                    <h4 style={{marginTop: -15}}>{user.fullName}</h4>
                                    <p className="text-secondary mb-1">{user.phone}</p>
                                    <p className="text-muted font-size-sm">
                                        {user.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <Formik enableReinitialize={true} initialValues={{
                                fullName: `${user.fullName ? user.fullName : ""}`,
                                phone: `${user.phone ? user.phone : ""}`,
                                age: `${user.age == 0 ? null : user.age}`,
                                address: `${user.address}`
                            }} onSubmit={(values) => {
                                editProfile(values)
                            }}>
                                <Form>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary"><Field name={'fullName'}
                                                                                            type={'text'} style={{
                                                width: "300px",
                                                height: "40px"
                                            }}/></div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0" style={{marginTop: 12}}>Age</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary"><Field name={'age'} type={"number"}
                                                                                            style={{
                                                                                                width: "300px",
                                                                                                height: "40px"
                                                                                            }}/></div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0" style={{marginTop: 12}}>Phone</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary"><Field name={'phone'} type={'text'}
                                                                                            style={{
                                                                                                width: "300px",
                                                                                                height: "40px"
                                                                                            }}/></div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0" style={{marginTop: 12}}>Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary"><Field name={'address'}
                                                                                            type={'text'} style={{
                                                width: "300px",
                                                height: "40px"
                                            }}/></div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <button class="btn-primary">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>

                            </Formik>

                        </div>
                        <div className="row gutters-sm">
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Profile;