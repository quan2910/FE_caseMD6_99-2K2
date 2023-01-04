import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addWallets} from "../../service/walletsService";
import {Field, Form, Formik} from "formik";
import {useEffect} from "react";
import {getMoneyType} from "../../service/moneyTypeService";

export default function CreateWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
        const moneyType = useSelector(state => {
            return state
        })

    useEffect(()=>{
        dispatch(getMoneyType())
    },[])

    const handleAddWallet = async (values) => {
        let data = {
            ...values, userId: user.idUser
        }
        await dispatch(addWallets(data))
        navigate('/home')
    }

    return (
        <div>
            <div className="container" id="container">
                <div>
                    <Formik initialValues={{nameWallet: '',moneyAmount: '', status: '1',moneyTypeId:''}} onSubmit={(values) => {
                        handleAddWallet(values)
                    }}>
                        <Form>
                            <h1 style={{color: "black", marginTop: 60}}>Create Wallet</h1>
                            <br/>
                            <Field type="text" name={"nameWallet"} id={"nameWallet"} placeholder="Wallet Name"
                                   style={{backgroundColor: "lightgrey"}}/>

                            <Field type="number" name={"moneyAmount"} placeholder="Money"
                                   style={{backgroundColor: "lightgrey"}}/>

                            <Field as={'select'} name={"moneyTypeId"} style={{
                                border: 'none',
                                color: "gray",
                                marginTop: 10,
                                width: 645,
                                height: 44,
                                backgroundColor: "lightgray"
                            }} >
                                <option selected>Open this select menu</option>
                                <option value={"1"}>Vietnam Dong</option>
                                <option value="2">Dollar</option>
                            </Field>
                            <br/>
                            <button type={"submit"}>Create Wallet</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}