import "../../style/style.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showDetailWallet, showTransactionByMoth} from "../../service/walletService";
import ChangePassword from "../user/change-password";
import CreateTransaction from "../transaction/CreateTransaction";
import CreateCategory from "../category/CreateCategory";
import {Field, Form, Formik} from "formik";


export default function Home() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let dispatch = useDispatch()
    let detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })

    let [time,setTime]=useState('0000-00-00')
let [flag,setFlag] =useState(true)
    useEffect(()=>{
        (async ()=>{
                 let detailWallet = await dispatch(showDetailWallet(user.idUser))
        })()
    }, [])


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

   const handleTransactionByMoth=async (e)=>{
        let str = e.target.value
         if(str==''){
             await dispatch(showDetailWallet(user.idUser))
             return
         }
       console.log(str)
       let date = str.split('-');
        let dataMonth = {
            idUser:user.idUser,
            year:date[0],
            month:date[1]
        }
        await dispatch(showTransactionByMoth(dataMonth))
    }


    if (!detailWalletHome) return <div>Loading...</div>
    if (!detailWalletHome.wallet) return <div>Loading...</div>
    return (
        <>
            {/* ======= About Me ======= */}
            <div className="about-me containerTemplate">
                {/*<div className="section-title">*/}
                {/*    <p style={{color:"black"}}>{user.username}</p>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-3" style={{marginTop:50}}>
                        {/*<Formik initialValues={{form:time,to:time}} onSubmit={(values,{resetForm})=>{*/}
                        {/*    console.log(values)*/}
                        {/*    resetForm()*/}

                        {/*}}*/}

                        {/*>*/}
                        {/*    <Form>*/}
                        {/*        <div className="col-12" style={{marginBottom: 50, color: "black"}}>*/}
                        {/*            <Field type={'date'} name={'form'}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-12" style={{marginBottom: 50, color: "black"}}>*/}
                        {/*            <Field type={'date'} name={'to'}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="col-12" style={{marginBottom: 50, color: "black"}}>*/}
                        {/*            <button className="btn btn-primary">Search</button>*/}
                        {/*        </div>*/}
                        {/*    </Form>*/}
                        {/*</Formik>*/}

                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <div style={{marginBottom:'20px'}} className={'offset-3 col-4'}>
                            <input onChange={(event)=>{
                                handleTransactionByMoth(event)}} type={'month'}></input>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <h3  style={{marginBottom: 25}}>{detailWalletHome.wallet[0].nameWallet}</h3>
                                <strong><h5 style={{color:"black"}}>
                                    TotalMoney : {totalConsumableMoney().total}
                                </h5></strong>
                            </div>
                            <div className="col-lg-4"  >
                                <i className="bi bi-chevron-right" style={{color:"black", marginLeft: 60}}></i> <strong style={{color:"black"}}>Expenditure: {totalConsumableMoney().ConsumableMoney}</strong>
                            </div>
                            <div className="col-lg-4">
                                <i className="bi bi-chevron-right" style={{color:"black", marginLeft: 50}}></i> <strong style={{color:"black"}}>Revenue: {totalConsumableMoney().moneyIncome}</strong>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div style={{marginLeft: 640, marginTop: -40, marginBottom:13}}>
                                <strong><CreateTransaction style={{color:"black"}} idWallet={detailWalletHome.wallet[0].idWallet}></CreateTransaction></strong>
                                <span style={{marginLeft: 400}}></span>
                            </div>
                            {/*<div  style={{marginLeft: 0}}>*/}
                            {/*    <Category style={{color:"black"}}></Category>*/}
                            {/*</div>*/}
                        </div>
                        <div>

                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <table className="table table-striped" >
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
            {/* End About Me */}
        </>
    )
}