import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../service/categoriesService";
import {addTransaction, updateTransaction} from "../../service/transactionService";
import {showDetailWallet, showTransactionByMoth, showTransactionByOnlyMonth} from "../../service/walletService";
import {findById} from "../../service/userService";
import Swal from "sweetalert2";


export default function EditTransaction(props) {
    const [open, setOpen] = React.useState(false);
    const [income,setIncome]= useState('')
    const[time,setTime]=useState('')
    const dispatch = useDispatch();
    const categories = useSelector(state => {
        return  state.category.category
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })
    const [transaction,setTransaction]=useState({})

    useEffect(() => {
        dispatch(getCategory());
    }, [])
    let handleFinnTransaction = ()=>{
        detailWalletHome.transactions.map((transaction)=>{
if(transaction.idTransaction==props.idTransaction){
    setTime(transaction.time.substring(0,10))
    return setTransaction(transaction)
}



        })
    }
    if(!categories){return <h1>haha</h1>}
    return (
        <React.Fragment>
            <div
                // variant="outlined"
                onClick={() =>{
                    setOpen(true)
                       handleFinnTransaction()
                } }
            >
                <i className="fa-regular fa-pen-to-square"></i>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", background:'white', border: 'none', boxShadow: '2px 4px 5px black', width: 800}}
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        borderRadius: 'md',
                        p: 3
                    }}
                >
                    <Typography
                        id="basic-modal-dialog-title"
                        component="h2"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        Transaction
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="black"
                        textAlign={"center"}
                    >
                        Fill in the information of the spending.
                    </Typography>
                    <Formik
                        initialValues={{
                            time:time,
                            totalSpent: transaction.totalSpent,
                            categoryId: '',
                            walletId: transaction.walletId,
                            note: transaction.note
                        }}
                        enableReinitialize={true}
                        onSubmit={async (event) => {
                            let data = {
                                idTransaction:transaction.idTransaction,
                                time: event.time,
                                totalSpent: event.totalSpent,
                                categoryId: event.categoryId,
                                walletId: props.idWallet,
                                note: event.note,
                                userID :user.idUser
                            }
                            await dispatch(updateTransaction(data))
                            if(props.date==''){
                                await dispatch(showDetailWallet(user.idUser))

                            }else {
                                let str =props.date
                                let date = str.split('-');
                                let dataMonth = {
                                    idUser:user.idUser,
                                    year:date[0],
                                    month:date[1]
                                }
                                await dispatch(showTransactionByMoth(dataMonth))
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Create Success!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            await dispatch(getCategory())
                            await dispatch(findById(user.idUser))
                            await dispatch(showTransactionByOnlyMonth(user.idUser))


                            setOpen(false)
                        }}
                    >
                        <Form>
                            <Stack spacing={2}>
                                <Field type={'date'} style={{backgroundColor:"lightgray", width: "600px"}} placeholder={'Time'} autoFocus required name={'time'}/>
                                <Field style={{backgroundColor:"lightgray"}} placeholder={'Total Spent'} required name={'totalSpent'}/>
                                <Field style={{backgroundColor:"lightgray"}} placeholder={'Note'} required name={'note'}/>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input onChange={(event)=>{
                                            setIncome(event.target.value)
                                        }} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="thu" style={{padding: '8px 8px'}}/>
                                        <label className="form-check-label" htmlFor="inlineRadio1">Thu</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input onChange={(event)=>{
                                            setIncome(event.target.value)
                                        }} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="chi" style={{padding: '8px 8px'}}/>
                                        <label className="form-check-label" htmlFor="inlineRadio2">Chi</label>
                                    </div>
                                </div>
                                <Field as={'select'} name={'categoryId'} style={{height:40, backgroundColor:"lightgray"}} className="custom-select" id="inputGroupSelect02">
                                    <option selected>Loại chi tiêu...</option>
                                    {categories.map(item => {
                                        if(user.idUser==item.userId && item.statusCategory==income) {
                                            return (
                                                <option  value={item.idCategory}>{item.nameCategory}</option>
                                            )
                                        }
                                    })}
                                </Field>
                                <Button type="submit" style={{marginLeft: 230 ,backgroundColor: "#82AAE3", color:"white", width: "150px",align:"center", borderRadius: "20px"}}>Save</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}