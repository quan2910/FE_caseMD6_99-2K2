import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import CreateCategory from "../category/CreateCategory";
import CreateWallet from "./CreateWallet";
import {useEffect} from "react";
import {addWallets, getWallets} from "../../service/walletsService";
import * as React from "react";
import {Link} from "react-router-dom";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";

export default function EditWallet() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })

    useEffect(async ()=>{
        let a= await dispatch(getWallets())
    },[])


    return (
        <>

        </>

    )
}