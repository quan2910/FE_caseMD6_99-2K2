import "../../style/style.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showDetailWallet, showTransactionByDate, showTransactionByMoth} from "../../service/walletService";
import ChangePassword from "../user/change-password";
import CreateTransaction from "../transaction/CreateTransaction";
import CreateCategory from "../category/CreateCategory";
import {Field, Form, Formik} from "formik";
import Swal from 'sweetalert2'
import DeleteTransaction from "../transaction/deleteTransaction";

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

let [flag,setFlag] =useState(true)
    useEffect(()=>{
        (async ()=>{
            let dataMonth = {
                idUser:user.idUser,
                year:d.getFullYear(),
                month:(d.getMonth()+1)
            }
            await dispatch(showTransactionByMoth(dataMonth))
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
           return <div>{dataDate.fromDate}---{dataDate.toDate}</div>
       }else {
           return ''
       }
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
                    <div className="col-3" style={{marginTop:"50px"}}>
                        <Formik initialValues={{formDate:time,toDate:time}} onSubmit={(values,{resetForm})=>{
                         setMonth('')
                            handleTransactionByDate(values)

                        }}

                        >
                            <Form>
                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <Field type={'date'} name={'formDate'}/>
                                </div>
                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <Field type={'date'} name={'toDate'}/>
                                </div>

                                <div className="col-12" style={{marginBottom: 50, color: "black"}}>
                                    <button className="btn btn-primary">Search</button>
                                </div>
                            </Form>
                        </Formik>

                    </div>
                    <div className="col-lg-8 pt-4 pt-lg-0 content">
                        <div style={{marginBottom:'20px'}} className={'offset-3 col-4'}>
                            <input  onChange={(event)=>{
                                setMonth(event.target.value)
                                setFlag(true)
                                handleTransactionByMonth(event)

                            }}  type={'month'} value={month}></input>
                            {showDate()}
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
                                <strong><CreateTransaction style={{color:"black"}} date={month} idWallet={detailWalletHome.wallet[0].idWallet}></CreateTransaction></strong>
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
                                        <th scope="col">Action</th>
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
                                            <td><DeleteTransaction date={month} idTransaction={transaction.idTransaction}></DeleteTransaction></td>
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