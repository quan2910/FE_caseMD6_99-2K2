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

export default function CreateCategory() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "white"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
               Create Category
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
                        Create Category
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
                            nameCategory: '',
                            statusCategory: '',
                            userId: '',
                            color: ''
                        }}
                        onSubmit={async (event) => {
                            let data = {
                                nameCategory: event.nameCategory,
                                statusCategory: event.statusCategory,
                                userId: user.idUser,
                                color: event.color
                            }
                            await  dispatch(addCategory(data))
                            await dispatch(getCategory())
                            Swal.fire({
                                position: 'center',
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
                                <div style={{width:100}}>
                                    <Field style={{height: 60}} type="color" name="color" defaultValue="#e66465" ></Field>
                                </div>
                                <Field style={{height: "40px", backgroundColor:"lightgray", width: 600}} placeholder={'Name Category'} autoFocus required name={'nameCategory'}/>
                                <Field as={'select'} name={'statusCategory'} style={{height:40,backgroundColor:"lightgray"}} className="custom-select" id="inputGroupSelect02">
                                    <option selected>Revenue or Expenditure...</option>
                                    <option value="Revenue">Revenue</option>
                                    <option value="Expenditure">Expenditure</option>
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