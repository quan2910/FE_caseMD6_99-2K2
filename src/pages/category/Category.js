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

export default function Category() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const categories = useSelector(state => {
        return  state.category.category
    })

    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    return (
        <React.Fragment>
            <Link
                // variant="outlined"
                color="neutral"
                style={{color: "black"}}
                onClick={() => setOpen(true)}
            >
                Create Category
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
                        Create Category
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
                            nameCategory: '',
                            statusCategory: '',
                            userId: '',
                            color: ''
                        }}
                        onSubmit={(event) => {
                            console.log(event)
                            let data = {
                                nameCategory: event.nameCategory,
                                statusCategory: event.statusCategory,
                                userId: user.idUser,
                                color: 'vàng'
                            }
                            dispatch(addCategory(data))
                            // event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Form>
                            <Stack spacing={2}>
                                <Field placeholder={'Name Category'} autoFocus required name={'nameCategory'}/>
                                <Field as={'select'} name={'statusCategory'} style={{height:40}} className="custom-select" id="inputGroupSelect02">
                                    <option selected>Thu hay chi...</option>
                                    <option value="thu">Thu</option>
                                    <option value="chi">Chi</option>
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