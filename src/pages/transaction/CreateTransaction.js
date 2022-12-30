import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import {Field, Form, Formik} from "formik";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../service/categoriesService";
import {addTransaction} from "../../service/transactionService";
import {showDetailWallet} from "../../service/walletService";

export default function CreateTransaction() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const categories = useSelector(state => {
        console.log('state category', state.category.category)
        return  state.category.category
    })
    const user = useSelector(state => {
        console.log(state.user.currentUser.user.authenticUser[0])
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
                startDecorator={<Add/>}
                onClick={() => setOpen(true)}
            >
                Create Transaction
            </Button>
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
                        Create Transaction
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
                                walletId: 10,
                                note: event.note
                            }
                            setOpen(false);
                            await  dispatch(addTransaction(data))
                         await dispatch(showDetailWallet(user.idUser))
                        }}
                    >
                        <Form>
                        <Stack spacing={2}>
                            <Field placeholder={'Time'} autoFocus required name={'time'}/>
                            <Field placeholder={'Total Spent'} required name={'totalSpent'}/>
                            <Field placeholder={'Note'} required name={'note'}/>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                </div>
                            </div>
                            <Field as={'select'} name={'categoryId'} style={{height:40}} className="custom-select" id="inputGroupSelect02">
                                <option selected>Loại chi tiêu...</option>
                                {categories.map(item => {
                                    if(user.idUser==item.userId) {
                                        return (
                                            <option value={item.idCategory}>{item.nameCategory}</option>
                                        )
                                    }
                                })}
                            </Field>
                            <Button type="submit">Submit</Button>
                        </Stack>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}