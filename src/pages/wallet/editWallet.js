import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import CreateCategory from "../category/CreateCategory";
import CreateWallet from "./CreateWallet";
import {useEffect} from "react";
import {addWallets, editWallet, getWallets} from "../../service/walletsService";
import * as React from "react";
import {Link} from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Swal from "sweetalert2";

export default function EditWallet(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })
    let walletEdit = {}
    wallets.map(item=>{
        if(item.idWallet == props.idWallet) {
            walletEdit = item;
            return walletEdit
        }
    })

    return (
        <>
            <React.Fragment>
                <Link
                    color="neutral"
                    style={{color: "black",width: 150}}
                    onClick={() => setOpen(true)}
                >
                    <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        style={{color: "black", width:800, background:"white", boxShadow: '2px 4px 5px black'}}
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
                            Edit Wallet
                        </Typography>
                        <Typography
                            id="basic-modal-dialog-description"
                            mt={0.5}
                            mb={2}
                            textColor="black"
                            textAlign={"center"}
                        >
                            Fill in the information of the wallet.
                        </Typography>
                        <Formik
                            initialValues={{
                                idWallet: walletEdit?.idWallet,
                                nameWallet: walletEdit?.nameWallet,
                                moneyAmount: walletEdit?.moneyAmount,
                                status: '1',
                                moneyTypeId:'',
                                userId: ''
                            }}
                            onSubmit={ async (e)=>{
                                let data = {
                                    idWallet: walletEdit?.idWallet,
                                    nameWallet: e?.nameWallet,
                                    moneyAmount: e?.moneyAmount,
                                    status: e?.status,
                                    moneyTypeId: e?.moneyTypeId,
                                    userId: walletEdit?.idUser
                                }
                                await dispatch(editWallet(data))
                                await dispatch(getWallets())
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Edit Success!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                setOpen(false)
                            }}
                        >
                            <Form>
                                <Stack spacing={2}>
                                    <Field placeholder={'Name Wallet'} style={{height: 40, width: 600, background: "lightgrey"}} autoFocus required name={'nameWallet'}/>
                                    <Field placeholder={'Money Amount'} style={{background: "lightgrey"}} autoFocus required name={'moneyAmount'}/>
                                    <Field as={'select'} name={"moneyTypeId"} style={{height:40, background: "lightgrey"}} className="custom-select" id="inputGroupSelect02">
                                        <option selected>Open this select menu</option>
                                        <option value={"1"}>Vietnam Dong</option>
                                        <option value="2">Dollar</option>
                                    </Field>
                                    <Button style={{backgroundColor: "#82AAE3",color: "white", width:150, marginLeft:237, borderRadius: "20px"}} type="submit">Save</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </>
    )
}