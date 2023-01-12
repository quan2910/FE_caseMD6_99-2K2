import {useDispatch, useSelector} from "react-redux";
import CreateWallet from "./CreateWallet";
import React, {useEffect} from "react";
import {deleteWallet, getWallets} from "../../service/walletsService";
import Swal from "sweetalert2";
import EditWallet from "./EditWallet"
import DetailWallet from "./DetailWallet";
import LimitMoney from "./LimitMoney";
import {getLimit} from "../../service/limitMoneyService";
import {Link} from "react-router-dom";

export default function ShowWallet() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })
    const currentWallet = useSelector(state => {
        return state.wallet.detailWalletHome.wallet[0]
    })
    const handleDeleteWallet = (idWallet)=> {
        if(idWallet==currentWallet.idWallet) {
            Swal.fire({
                icon: 'warning',
                title: 'Ví đang bật xóa đb'
            })
        } else {
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
    }

    let stt = 1
    useEffect(  ()=>{
        dispatch(getWallets())
        dispatch(getLimit())
    },[])
    let handleTypeMoney = (moneyTypeId)=>{
        if(moneyTypeId==1){
            return "VND"
        }else {
            return "USD"
        }
    }

    if (!wallets) return <div>Loading...</div>
    return (

        <div className="row" style={{marginLeft:180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12}}>
                <CreateWallet></CreateWallet>
            </button>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12}}><LimitMoney></LimitMoney></button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{ width:1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col" style={{textAlign: "center"}}>STT</th>
                        <th scope={"col"} style={{textAlign: "center"}}>Detail</th>
                        <th scope="col" style={{width: 300, textAlign: "center"}}>Name Wallet</th>
                        <th scope="col" style={{width: 300, textAlign: "center"}}>Money Type</th>
                        <th scope={"col"} colSpan={2} style={{textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        wallets.map((item, index)=>{
                            if(item.userId == user.idUser) {
                                return (
                                    <tr>
                                        <th scope="row"style={{textAlign: "center"}}>{stt++}</th>
                                        <th scope="row"style={{textAlign: "center"}}><DetailWallet idWallet={item.idWallet}/> </th>
                                        <td style={{textAlign: "center"}}>{item.nameWallet}</td>
                                        <td style={{textAlign: "center"}}>{handleTypeMoney(item.moneyTypeId)}</td>
                                        <td style={{textAlign:"center"}}><EditWallet idWallet={item.idWallet}></EditWallet></td>
                                        <td style={{textAlign:"center"}} onClick={()=>{
                                            handleDeleteWallet(item.idWallet)
                                        }}><i className="fa-regular fa-trash-can"></i></td>
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