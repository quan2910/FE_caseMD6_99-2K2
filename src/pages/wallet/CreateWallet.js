import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addWallets} from "../../service/walletsService";
import {Field, Form, Formik} from "formik";

export default function CreateWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => {

        return state.user.currentUser.user.authenticUser[0]

    })

    const handleAddWallet = async (values) => {
        let data = {
            ...values, userId: user.idUser
        }
        await dispatch(addWallets(data))
        navigate('/home')
    }

    return (
        <div style={{marginTop: 70}}>
            <div className="container" id="container">
                <div>
                    <Formik>
                        <Form>
                            <h1 style={{color: "black", marginTop: 60}}>Create Wallet</h1>
                            <br/>
                            <Field type="text" name={"username"} placeholder="Wallet Name"
                                   style={{backgroundColor: "lightgrey"}}/>

                            <Field type="number" name={"password"} placeholder="Money"
                                   style={{backgroundColor: "lightgrey"}}/>

                            <select style={{
                                border: 'none',
                                color: "gray",
                                marginTop: 10,
                                width: 645,
                                height: 44,
                                backgroundColor: "lightgray"
                            }}>
                                <option selected>Open this select menu</option>
                                <option value="1">Vietnam Dong</option>
                                <option value="2">Dollar</option>
                            </select>
                            <br/>
                            <button>Create Wallet</button>
                        </Form>
                    </Formik>
                </div>
                <>
                    <div style={{marginTop: 200}} className="about-me containerTemplate">
                        <Formik initialValues={{nameWallet: '', moneyAmount: '', status: ''}} onSubmit={(values) => {
                            handleAddWallet(values)
                        }}>
                            <Form action="forms/contact.php" method="post" role="form"
                                  className="php-email-form mt-4 containerTemplate">
                                <h1 style={{textAlign: 'center', color: 'red'}}>Add Wallet</h1>
                                <div className=" form-group">
                                    <Field type="text" name={"nameWallet"} className="form-control" id="nameWallet"
                                           placeholder="Name Wallet"
                                           required/>
                                </div>

                                <div className=" form-group mt-3 mt-md-0">
                                    <Field type="text" className="form-control" name={"moneyAmount"} id="moneyAmount"
                                           placeholder="moneyAmount" required/>
                                </div>

                                <div className="form-group mt-1">
                                    <Field type="text" className="form-control" name={"status"} id="status"
                                           placeholder="Status"
                                           required/>
                                </div>
                                {/*<div className="form-group mt-3">*/}
                                {/*    <textarea className="form-control" name="message" rows={5} placeholder="Message" required*/}
                                {/*              defaultValue={""}/>*/}
                                {/*</div>*/}
                                {/*<div className="my-3">*/}
                                {/*    <div className="loading">Loading</div>*/}
                                {/*    <div className="error-message"/>*/}
                                {/*    <div className="sent-message">Your message has been sent. Thank you!</div>*/}
                                {/*</div>*/}
                                <div className="text-center">
                                    <button type="submit">Send Message</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </>
            </div>
        </div>
    )
}