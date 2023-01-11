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
import Swal from "sweetalert2";
import {addLimit} from "../../service/limitMoneyService";

export default function LimitMoney() {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    useEffect(()=> {
        dispatch(addLimit())
    },[])
    return(
        <>
            <React.Fragment>
                <Link
                    color="neutral"
                    style={{color: "white"}}
                    onClick={() => setOpen(true)}
                >
                    Limit Money
                </Link>
            </React.Fragment>
        </>
    )
}










