import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import CreateCategory from "../category/CreateCategory";
import CreateWallet from "./CreateWallet";
import {useEffect} from "react";
import {addWallets, getWallets} from "../../service/walletsService";
import data from "bootstrap/js/src/dom/data";

export default function ShowWallet() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const wallets = useSelector(state => {
        return state.wallet.wallets

    })

    useEffect(async ()=>{
       let a= await dispatch(getWallets())
    },[])

    return (
        <div className="row" style={{marginLeft:180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12, background:"rgb(255, 174, 129)"}}>
                <CreateWallet></CreateWallet>
            </button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{background:"rgb(255, 174, 129)", width:1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Name Wallet</th>
                        <th scope="col">Money Amount</th>
                        <th scope="col">Status</th>
                        <th scope={"col"}>UserId</th>
                        <th scope={"col"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        wallets.map((item, index)=>{
                            if(item.userId == user.idUser) {
                                return (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{item.nameWallet}</td>
                                        <td>{item.moneyAmount}</td>
                                        <td>{item.status}</td>
                                        <td>{user.idUser}</td>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}