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
                    style={{color: "black"}}
                    onClick={() => setOpen(true)}
                >
                    Edit
                </Link>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                        style={{color: "black"}}
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
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
                        >
                            Fill in the information of the project.
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
                                setOpen(false)
                            }}
                        >
                            <Form>
                                <Stack spacing={2}>
                                    <Field placeholder={'Name Wallet'} autoFocus required name={'nameWallet'}/>
                                    <Field placeholder={'Money Amount'} autoFocus required name={'moneyAmount'}/>
                                    <Field as={'select'} name={"moneyTypeId"} style={{height:40}} className="custom-select" id="inputGroupSelect02">
                                        <option selected>Open this select menu</option>
                                        <option value={"1"}>Vietnam Dong</option>
                                        <option value="2">Dollar</option>
                                    </Field>
                                    <Button type="submit">Submit</Button>
                                </Stack>
                            </Form>
                        </Formik>
                    </ModalDialog>
                </Modal>
            </React.Fragment>
        </>
    )
}