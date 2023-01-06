import "../../style/style.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    showDetailWallet,
    showTransactionByDate,
    showTransactionByMoth,
    showTransactionByOnlyMonth
} from "../../service/walletService";
import CreateTransaction from "../transaction/CreateTransaction";
import {Field, Form, Formik} from "formik";
import Swal from 'sweetalert2'
import DeleteTransaction from "../transaction/deleteTransaction";
import PieChart from "../chart/PieChart";

import {deleteTransaction} from "../../service/transactionService";
import EditTransaction from "../transaction/editTransaction";
import {blue} from "@mui/material/colors";
import BarChart from "../chart/barChart";


export default function Home() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let dispatch = useDispatch()
    let detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })

    let [time,setTime]=useState('"yyyy-MM-dd"')
    let d = new Date();
    let monthNow = 0 + (d.getMonth()+1).toString()
    let [month,setMonth]=useState(`${d.getFullYear()}-${monthNow}`)
    let [dataDate,setDataDate] = useState({})
    let [type,setType]=useState('')
    let [flag,setFlag] =useState(true)
    useEffect(()=>{
        (async ()=>{
            let dataMonth = {
                idUser:user.idUser,
                year:d.getFullYear(),
                month:(d.getMonth()+1)
            }
            await dispatch(showTransactionByMoth(dataMonth))
            await dispatch(showTransactionByOnlyMonth(user.idUser))
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

    const handleTransactionByMonth=async (e)=>{
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
    const handleTransactionByDate =async (values)=>{
        if(values.formDate == ""  ){

            await dispatch(showDetailWallet(user.idUser))
            setFlag(true)
            return
        }
        if(values.formDate == `"yyyy-MM-dd"`  ){
            setFlag(true)
            await dispatch(showDetailWallet(user.idUser))
            return
        }
        let date = {
            idUser :user.idUser,
            fromDate:values.formDate,
            toDate:values.toDate
        }
        setDataDate(date)
        if(values.formDate>values.toDate){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'DATE ERROR',
                showConfirmButton: false,
                timer: 1500
            })
            return
        }
        setFlag(false)
        let a= await dispatch(showTransactionByDate(date))

    }
    const showDate =()=>{
        if(flag==false){
            return <div style={{marginTop: -5, textAlign:"center", fontWeight:"bold"}}>{dataDate.fromDate} -> {dataDate.toDate}</div>
        }else {
            return ''
        }
    }


    if (!detailWalletHome) return <div>Loading...</div>
    if (!detailWalletHome.wallet) return <div>Loading...</div>
    return (
        <>
            <div className="about-me containerTemplate" style={{marginTop: -35}}>
                <div className="row">
                    <div className="col-3" style={{marginTop:"28px"}}>
                        <h5 style={{textAlign:"center", fontWeight:"bold", marginBottom: 15}}>Find Transaction</h5>
                        <Formik initialValues={{formDate:time,toDate:time}} onSubmit={(values,{resetForm})=>{
                            setMonth('')
                            handleTransactionByDate(values)
                            resetForm()
                        }}
                        >
                            <Form>
                                <div style={{marginLeft: -195}}>From</div>
                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <Field type={'date'} name={'formDate'}/>
                                </div>
                                <div style={{marginLeft: -195, marginTop: -40}}>To</div>
                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <Field type={'date'} name={'toDate'}/>
                                </div>
                                <div style={{marginBottom: 50, marginTop: -50, color:"red"}}>{showDate()}</div>
                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <button>Search</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <div style={{marginBottom:'20px'}} className={'offset-3 col-4'}>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <h3  style={{marginBottom:-2}}>{detailWalletHome.wallet[0].nameWallet}</h3>
                                <h5 style={{color:"black",marginTop: 23, marginLeft: 0, fontWeight: "bold"}}>
                                    TotalMoney : {totalConsumableMoney().total}
                                </h5>
                            </div>
                            <div className="col-lg-4"  >
                                <i className="bi bi-chevron-right" style={{color:"black", marginLeft: 60}}></i> <strong style={{color:"black"}}>Expenditure: {totalConsumableMoney().ConsumableMoney}</strong>
                                <input
                                    style={{background:"white", color:"blue", fontWeight:"bold", width: 200, marginLeft: 60}}
                                    onChange={(event)=>{
                                        setMonth(event.target.value)
                                        setFlag(true)
                                        handleTransactionByMonth(event)

                                    }}  type={'month'} value={month}></input>
                            </div>
                            <div className="col-lg-4">
                                <i className="bi bi-chevron-right" style={{color:"black", marginLeft: 50}}></i> <strong style={{color:"black"}}>Revenue: {totalConsumableMoney().moneyIncome}</strong>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div style={{marginLeft: 670, marginTop: -55, marginBottom:13}}>
                                <strong><CreateTransaction style={{color:"black"}} date={month} idWallet={detailWalletHome.wallet[0].idWallet}></CreateTransaction></strong>
                                <span style={{marginLeft: 300}}></span>
                            </div>
                        </div>
                        <div>
                        </div>
                        <div className="row" >
                            <div className="col-lg-12">
                                <table className="table table-striped" style={{marginTop: 10}}>
                                    <thead>
                                    <tr>
                                        <th style={{textAlign:"center"}} scope="col">STT</th>
                                        <th style={{textAlign:"center"}} scope="col">Time</th>
                                        <th style={{textAlign:"center"}} scope="col">Total Spent</th>
                                        <th style={{textAlign:"center"}} scope="col">Name Category</th>
                                        <th style={{textAlign:"center"}} scope="col">Note</th>
                                        <th style={{textAlign:"center"}} colSpan={2} scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {detailWalletHome.transactions.map((transaction,index)=>{
                                        return <tr>
                                            <th style={{textAlign:"center"}} scope="row">{index+1}</th>
                                            <td style={{textAlign:"center"}}>{new Date(transaction.time).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})}</td>
                                            <td style={{textAlign:"center"}}>{transaction.totalSpent}</td>
                                            <td style={{textAlign:"center"}}>{transaction.nameCategory}</td>
                                            <td style={{textAlign:"center"}}>{transaction.note}</td>
                                            <td style={{}}><EditTransaction date={month} idTransaction={transaction.idTransaction} idWallet={detailWalletHome.wallet[0].idWallet}></EditTransaction></td>
                                            <td style={{textAlign:"center"}}><DeleteTransaction date={month} idTransaction={transaction.idTransaction}></DeleteTransaction></td>
                                        <td style={{textAlign:"center"}}><EditTransaction date={month} idTransaction={transaction.idTransaction} idWallet={detailWalletHome.wallet[0].idWallet}></EditTransaction></td>

                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                <div style={{width:"400px"}}><BarChart></BarChart></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div  style={{ width: 300, marginTop: 50 }}>
                <div className={"row"}>
                    <div style={{textAlign:"center"}} className="custom-control custom-radio col-4">
                        Expenditure
                        <input
                            type="radio"
                            className="custom-control-input"
                            id="defaultUnchecked"
                            name="defaultExampleRadios"
                            onChange={(event)=>{
                                setType(event.target.value)   }}
                            value={'chi'}
                        />
                    </div>
                    <div style={{textAlign:"center"}} className="custom-control custom-radio col-4">
                        Both
                        <input
                            type="radio"
                            className="custom-control-input"
                            id="defaultChecked"
                            name="defaultExampleRadios"
                            defaultChecked=""
                            onChange={(event)=>{
                                setType(event.target.value)}}
                            value={''}
                        />
                    </div>
                    <div style={{textAlign:"center"}} className="custom-control custom-radio col-4">Revenue
                        <input
                            type="radio"
                            className="custom-control-input"
                            id="defaultChecked"
                            name="defaultExampleRadios"
                            defaultChecked=""
                            onChange={(event)=>{
                                setType(event.target.value)}}
                            value={'thu'}
                        />
                    </div>
                </div>
                <PieChart type={type}></PieChart>
            </div>
        </>
    )
}