import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import CreateCategory from "../category/CreateCategory";
import CreateWallet from "./CreateWallet";
import {useEffect} from "react";
import {addWallets, deleteWallet, getWallets} from "../../service/walletsService";
import data from "bootstrap/js/src/dom/data";
import Swal from "sweetalert2";
import {deleteCategory, getCategory} from "../../service/categoriesService";
import EditWallet from "./editWallet";
import {elGR} from "@mui/material/locale";

export default function ShowWallet() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })
    const handleDeleteWallet = (idWallet)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteWallet(idWallet))
            }
        })
    }

    useEffect(  ()=>{
        dispatch(getWallets())
    },[])

    if (!wallets) return <div>Loading...</div>
    return (
        <div className="row" style={{marginLeft:180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12}}>
                <CreateWallet></CreateWallet>
            </button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{ width:1000, borderRadius: "1%"}}>
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
                                        <th scope="row">{index++}</th>
                                        <td>{item.nameWallet}</td>
                                        <td>{item.moneyAmount}</td>
                                        <td>{item.status}</td>
                                        <td>{user.idUser}</td>
                                        <td><EditWallet idWallet={item.idWallet}></EditWallet></td>
                                        <td><button style={{borderRadius:"none"}} onClick={()=>{
                                            handleDeleteWallet(item.idWallet)
                                        }}>Delete</button></td>
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