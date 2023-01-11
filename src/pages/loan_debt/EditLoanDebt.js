import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, editCategory, getCategory} from "../../service/categoriesService";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Swal from "sweetalert2";
import {editLoanDebt, getDetailLoanDebt} from "../../service/loanDebtService";

export default function EditLoanDebt(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const loanDebt = useSelector(state => {
        return state.loanDebt.loanDebt
    })
    let loanDebtEdit = {}
    loanDebt.map(item => {
        if (item.idLoanDebt == props.idLoanDebt) {
            loanDebtEdit = item;
            return loanDebt
        }
    })
    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "black"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
                <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width: 800, background: "white", boxShadow: '2px 4px 5px black'}}
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
                        Edit Loan Debt
                    </Typography>
                    <Typography
                        id="basic-modal-dialog-description"
                        mt={0.5}
                        mb={2}
                        textColor="black"
                        textAlign={"center"}
                    >
                        Fill in the information of the loan debt.
                    </Typography>
                    <Formik
                        initialValues={{
                            idLoanDebt: loanDebtEdit.idLoanDebt,
                            namePersonLoanDebt: loanDebtEdit.namePersonLoanDebt,
                            contentLoanDebt: loanDebtEdit.contentLoanDebt,
                            moneyLoanDebt: loanDebtEdit.moneyLoanDebt,
                            idCategoryLoanDebt: loanDebtEdit.idCategoryLoanDebt,
                            idWallet: loanDebtEdit.idWallet
                        }}
                        onSubmit={async (event) => {
                            let data = {
                                idLoanDebt: loanDebtEdit.idLoanDebt,
                                namePersonLoanDebt: event.namePersonLoanDebt,
                                contentLoanDebt: event.contentLoanDebt,
                                moneyLoanDebt: event.moneyLoanDebt,
                                idCategoryLoanDebt: event.idCategoryLoanDebt,
                                idWallet: loanDebtEdit.idWallet
                            }
                            await  dispatch(editLoanDebt(data))
                            await dispatch(getDetailLoanDebt(loanDebtEdit.idWallet))
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Edit Success!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setOpen(false);
                        }}
                    >
                        <Form>
                            <Stack spacing={2}>
                                <Field style={{height: "40px", backgroundColor: "lightgray", width: 600}}
                                       placeholder={'Name'} autoFocus required name={'namePersonLoanDebt'}/>
                                <Field style={{height: "40px", backgroundColor: "lightgray", width: 600}}
                                       placeholder={'Content'} autoFocus required name={'contentLoanDebt'}/>
                                <Field style={{height: "40px", backgroundColor: "lightgray", width: 600}}
                                       placeholder={'Money'} autoFocus required name={'moneyLoanDebt'}/>
                                <Field as={'select'} name={'idCategoryLoanDebt'}
                                       style={{height: 40, backgroundColor: "lightgray"}} className="custom-select"
                                       id="inputGroupSelect02">
                                    <option selected>Cho vay hay nợ...</option>
                                    <option value="1">Cho vay</option>
                                    <option value="2">Nợ</option>
                                </Field>
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
    );
}