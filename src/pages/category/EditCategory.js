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

export default function EditCategory(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const categories = useSelector(state => {
        return  state.category.category
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let categoryEdit = {}
    categories.map(item=>{
        if(item.idCategory == props.idCategory) {
            categoryEdit = item;
            return categoryEdit
        }
    })
    return (
        <React.Fragment>
            <Link
                // variant="outlined"
                color="neutral"
                style={{color: "black"}}
                className={'btn-primary'}
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
                        Edit Category
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
                            idCategory: categoryEdit.idCategory,
                            nameCategory: categoryEdit.nameCategory,
                            statusCategory: '',
                            userId: '',
                            color: ''
                        }}
                        onSubmit={async (event) => {
                            let data = {
                                idCategory: categoryEdit.idCategory,
                                nameCategory: event.nameCategory,
                                statusCategory: event.statusCategory,
                                userId: categoryEdit.idUser,
                                color: 'vàng'
                            }
                            await  dispatch(editCategory(data))
                            await dispatch(getCategory())
                            // event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Form>
                            <Stack spacing={2}>
                                <Field style={{height: "40px"}} placeholder={'Name Category'} autoFocus required name={'nameCategory'}/>
                                <Field as={'select'} name={'statusCategory'} style={{height:40}} className="custom-select" id="inputGroupSelect02">
                                    <option selected>Thu hay chi...</option>
                                    <option value="thu">Thu</option>
                                    <option value="chi">Chi</option>
                                </Field>
                                <Button style={{backgroundColor: "rgb(255, 75, 43)", width:100, marginLeft:47, borderRadius: "20px"}} type="submit">Submit</Button>
                            </Stack>
                        </Form>
                    </Formik>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}