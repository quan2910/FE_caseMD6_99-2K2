import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {addWallets, getWallets} from "../../service/walletsService";
import {Field, Form, Formik} from "formik";
import {useEffect} from "react";
import {getMoneyType} from "../../service/moneyTypeService";
import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import {addCategory, getCategory} from "../../service/categoriesService";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import {login} from "../../service/userService";
import {showDetailWallet} from "../../service/walletService";

export default function CreateWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })
    let check = []
    wallets.map(item => {
        if (item.userId == user.idUser) {
            check.push(item)
        }
    })

    useEffect(() => {
        dispatch(getMoneyType())
    }, [])

    const handleAddWallet = async (values) => {

        let data = {
            ...values, userId: user.idUser
        }
        await dispatch(addWallets(data))
    }

    return (
        <>
            <React.Fragment>
                <Link
                    color="neutral"
                    style={{color: "black"}}
                    onClick={() => setOpen(true)}
                >
                    Create Wallet
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
                            Create Wallet
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
                                nameWallet: '',
                                moneyAmount: '',
                                status: '',
                                moneyTypeId: '',
                                userId: ''
                            }}
                            onSubmit={async (e) => {
                                let status;
                                if (check.length > 0) {
                                    status = 0
                                } else {
                                    status = 1
                                }
                                let data = {
                                    nameWallet: e.nameWallet,
                                    moneyAmount: e.moneyAmount,
                                    status: status,
                                    moneyTypeId: e.moneyTypeId,
                                    userId: user.idUser
                                }

                                await dispatch(addWallets(data))
                                await dispatch(getWallets())
                                setOpen(false)
                            }}
                        >
                            <Form>
                                <Stack spacing={2}>
                                    <Field placeholder={'Name Wallet'} autoFocus required name={'nameWallet'}/>
                                    <Field placeholder={'Money Amount'} autoFocus required name={'moneyAmount'}/>
                                    <Field as={'select'} name={"moneyTypeId"} style={{height: 40}}
                                           className="custom-select" id="inputGroupSelect02">
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