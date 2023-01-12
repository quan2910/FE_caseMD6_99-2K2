import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {addWallets, editWallet, getWallets} from "../../service/walletsService";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {getMoneyType} from "../../service/moneyTypeService";
import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {addCategory, getCategory} from "../../service/categoriesService";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Swal from "sweetalert2";
import {addLimit, getLimit} from "../../service/limitMoneyService";

export default function LimitMoney(prop) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const wallets = useSelector(state => {
        return state.wallet.detailWalletHome.wallet[0]
    })
    const limits = useSelector(state => {
        return state.limit.limitMoney
    })
    useEffect(() => {
        dispatch(getLimit())
    }, [])
    let check = {}
    // limits && limits.map((itemLimit)=>{
    //     if (itemLimit.walletId == wallets.idWallet){
    //         check = itemLimit
    //     } else {
    //         check = 2
    //     }
    // })
    return (
        <>
            <React.Fragment>
                <Link
                    color="neutral"
                    style={{color: "white"}}
                    onClick={() => {
                        let a = false
                        limits && limits.map((itemLimit)=>{
                            if (itemLimit.walletId == wallets.idWallet){
                                a = true
                                return
                            } else {

                            }
                        })
                        if(a ==true){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'This wallet already has a spending limit!',
                            })
                            setOpen(false)
                        }else {
                            setOpen(true)
                        }

                    }}
                >
                    Spending Limit
                </Link>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        style={{color: "black", width: 800, background: "white", boxShadow: '2px 4px 5px black'}}
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{
                            borderRadius: 'md',
                            p: 3,
                        }}
                    >
                        <Typography
                            id="basic-modal-dialog-title"
                            component="h2"
                            level="inherit"
                            fontSize="1.25em"
                            mb="0.25em"
                        >
                            Spending Limit <br/>
                            {wallets.nameWallet}

                        </Typography>
                        <Typography
                            id="basic-modal-dialog-description"
                            mt={0.5}
                            mb={2}
                            textColor="black"
                            textAlign={"center"}
                        >
                            Set the limit amount you want to spend of this wallet.
                        </Typography>
                        <Formik initialValues={{
                            walletId: '',
                            moneyLimit:''
                        }} onSubmit={async (e) =>{
                            console.log('data', e)
                            let data = {
                                walletId:wallets?.idWallet,
                                moneyLimit:e?.moneyLimit
                            }
                            await dispatch(addLimit(data))
                            await dispatch(getLimit())
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Limit Success!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setOpen(false)
                        }}
                        >
                            <Form>
                                <Stack spacing={2}>
                                    <Field placeholder={'Limit Money'} style={{background: "lightgrey", width: 600}} autoFocus
                                           required name={'moneyLimit'}/>
                                    <Button style={{
                                        backgroundColor: "#82AAE3",
                                        color: "white",
                                        width: 150,
                                        marginLeft: 237,
                                        borderRadius: "20px"
                                    }} type="submit">Save</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </>
    )
}










