import "../../style/style.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showDetailWallet} from "../../service/walletService";
import ChangePassword from "../user/change-password";
import CreateTransaction from "../transaction/CreateTransaction";
import CreateCategory from "../category/CreateCategory";

export default function Home() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let dispatch = useDispatch()
    const detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })
    useEffect(()=>{
        (async ()=>{
        let detailWallet = await dispatch(showDetailWallet(user.idUser))
        })()
    }, [detailWalletHome])

    let totalConsumableMoney = ()=>{
        let totalMoney = {
            total:detailWalletHome.wallet[0].moneyAmount,
            ConsumableMoney:0,
            moneyIncome :0}
        if (detailWalletHome) {
       detailWalletHome.transactions.map((transaction,index)=>{
         if(transaction.statusCategory=="thu"){
             totalMoney.moneyIncome = totalMoney.moneyIncome+transaction.totalSpent
         }else {
             totalMoney.ConsumableMoney = totalMoney.ConsumableMoney+transaction.totalSpent
         }
       })
         totalMoney.total = totalMoney.total + totalMoney.moneyIncome-totalMoney.ConsumableMoney
        }

        return totalMoney
    }

    if (!detailWalletHome) return <div>Loading...</div>

    return (
        <>
            {/* ======= About Me ======= */}
            <div className="about-me containerTemplate">
                <div className="row">
                    <div className="col-3" style={{marginTop:50}}>
                        <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                            Tìm kiếm cái gì đấy
                        </div>
                        <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                            Tìm kiếm cái gì đấy
                        </div>
                        <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                            Tìm kiếm cái gì đấy
                        </div>
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <div className="row">
                            <div className="col-lg-4">
                                <h3>{detailWalletHome.wallet[0].nameWallet}</h3>
                                <h5 style={{color:"black"}}>
                                    Tổng tiền : {totalConsumableMoney().total}
                                </h5>
                            </div>
                            <div className="col-lg-4"  >
                                <i className="bi bi-chevron-right" style={{color:"black"}}></i> <strong style={{color:"black"}}>Chi: {totalConsumableMoney().ConsumableMoney}</strong>
                            </div>
                            <div className="col-lg-4">
                                <i className="bi bi-chevron-right" style={{color:"black"}}></i> <strong style={{color:"black"}}>Thu: {totalConsumableMoney().moneyIncome}</strong>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div  style={{marginLeft: 0}}>
                                <CreateTransaction style={{color:"black"}} idWallet={detailWalletHome.wallet[0].idWallet}></CreateTransaction>
                                <span style={{marginLeft: 900}}></span>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-striped" style={{background:"#FFAE81"}}>
                                    <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Total Spent</th>
                                        <th scope="col">Name Category</th>
                                        <th scope="col">Note</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {detailWalletHome.transactions.map((transaction,index)=>{

                                        return <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{new Date(transaction.time).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</td>
                                            <td>{transaction.totalSpent}</td>
                                            <td>{transaction.nameCategory}</td>
                                            <td>{transaction.note}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}