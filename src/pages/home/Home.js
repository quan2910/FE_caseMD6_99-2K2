import "../../style/style.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showDetailWallet} from "../../service/walletService";
import ChangePassword from "../user/change-password";


export default function Home() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let dispatch = useDispatch()
    const detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })
    let wallet
    console.log(detailWalletHome)

    useEffect(()=>{
        (async ()=>{
        let detailWallet = await dispatch(showDetailWallet(user.idUser))
        })()
    }, [user])

    let totalConsumableMoney = ()=>{
        let totalMoney = {
            total:detailWalletHome.wallet[0].moneyAmount,
            ConsumableMoney:0,
            moneyIncome :0}
        if (detailWalletHome) {
            console.log(detailWalletHome)
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
    if(!user)return <div>Loading...</div>
    return (
        <>
            {/* ======= About Me ======= */}
            <div style={{marginTop: 150}} className="about-me containerTemplate">
                <div className="section-title">
                    <p style={{color:"black"}}>{user.username}</p>
                </div>
                <div className="row">
                    <div className="col-lg-4" data-aos="fade-right">
                        <img src="assets/img/me.jpg" className="img-fluid" alt=""/>
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">

                        <h3>{detailWalletHome.wallet[0].nameWallet}</h3>
                        <div className="col-lg-6">
                            <ul>
                                <li><i className="bi bi-chevron-right" style={{color:"black"}}></i> <strong style={{color:"black"}}>Chi: {totalConsumableMoney().ConsumableMoney}</strong></li>
                                <li><i className="bi bi-chevron-right" style={{color:"black"}}></i> <strong style={{color:"black"}}>Thu: {totalConsumableMoney().moneyIncome}</strong></li>
                            </ul>
                        </div>
                        <p className="fst-italic" style={{color:"black"}}>
                            Tổng tiền : {totalConsumableMoney().total} $
                        </p>
                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-striped" style={{background:"linear-gradient(to right, #FF4B2B, #FF416C)"}}>
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
                                            <td>{transaction.time}</td>
                                            <td>{transaction.totalSpent}</td>
                                            <td>{transaction.nameCategory}</td>
                                            <td>{transaction.note}</td>
                                        </tr>
                                    })}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 style={{color:"black"}}>Biểu đồ</h2>
                            </div>
                            <div className="col-lg-6">
                                <h2 style={{color:"black"}}>Cũng là biểu đồ</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End About Me */}
        </>
    )
}