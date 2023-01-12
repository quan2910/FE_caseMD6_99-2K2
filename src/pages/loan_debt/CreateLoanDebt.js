import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, getCategory} from "../../service/categoriesService";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import {addLoanDebt, getDetailLoanDebt} from "../../service/loanDebtService";

export default function CreateLoanDebt() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const wallet = useSelector(state => {
        return state.wallet.detailWalletHome.wallet[0]
    })
    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "white"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
                Create Loan Debt
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width:800, boxShadow: '2px 4px 5px black', background:"white"}}
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
                        Create Loan Debt
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="black"
                        textAlign={"center"}
                    >
                        Fill in the information of the category.
                    </Typography>
                    <Formik
                        initialValues={{
                            namePersonLoanDebt: '',
                            contentLoanDebt: '',
                            moneyLoanDebt: '',
                            idCategoryLoanDebt: '',
                            idWallet: ''
                        }}
                        onSubmit={async (event) => {
                            let data = {
                                namePersonLoanDebt: event.namePersonLoanDebt,
                                contentLoanDebt: event.contentLoanDebt,
                                moneyLoanDebt: event.moneyLoanDebt,
                                idCategoryLoanDebt: event.idCategoryLoanDebt,
                                idWallet: wallet.idWallet
                            }
                            await  dispatch(addLoanDebt(data))
                            await dispatch(getDetailLoanDebt(wallet.idWallet))
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Create Success!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setOpen(false);
                        }}
                    >
                        <Form>
                            <Stack spacing={2}>
                                <Field style={{height: "40px", backgroundColor:"lightgray", width: 600}} placeholder={'Name'} autoFocus required name={'namePersonLoanDebt'}/>
                                <Field style={{height: "40px", backgroundColor:"lightgray", width: 600}} placeholder={'Content'} autoFocus required name={'contentLoanDebt'}/>
                                <Field style={{height: "40px", backgroundColor:"lightgray", width: 600}} placeholder={'Money'} autoFocus required name={'moneyLoanDebt'}/>
                                <Field as={'select'} name={'idCategoryLoanDebt'} style={{height:40,backgroundColor:"lightgray"}} className="custom-select" id="inputGroupSelect02">
                                    <option selected>Loans or Debts...</option>
                                    <option value="1">Loans</option>
                                    <option value="2">Debts</option>
                                </Field>
                                <Button style={{backgroundColor: "#82AAE3",color:"white", width:150, marginLeft:237, borderRadius: "20px"}} type="submit">Save</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}