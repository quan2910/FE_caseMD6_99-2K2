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
import {addTransaction} from "../../service/transactionService";
import {showDetailWallet, showTransactionByMoth} from "../../service/walletService";
import {findById} from "../../service/userService";

export default function CreateTransaction(props) {
    const [open, setOpen] = React.useState(false);
    const [income,setIncome]= useState('')
    const dispatch = useDispatch();
    const categories = useSelector(state => {
        return  state.category.category
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    useEffect(() => {
        dispatch(getCategory());
    }, [categories])

    if(!categories){return <h1>haha</h1>}
    return (
        <React.Fragment>
            <Button
                // variant="outlined"
                color="neutral"
                style={{color: "black"}}
                onClick={() => setOpen(true)}
            >
               +Transaction
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", background:'white', border: 'none', boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.75)', width: 800}}
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
                            time: '',
                            totalSpent: '',
                            categoryId: '',
                            walletId: '',
                            note: ''
                        }}
                        onSubmit={async (event) => {
                            let data = {
                                time: event.time,
                                totalSpent: event.totalSpent,
                                categoryId: event.categoryId,
                                walletId: props.idWallet,
                                note: event.note,
                                userID :user.idUser
                            }
                           await dispatch(addTransaction(data))
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
                            }


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