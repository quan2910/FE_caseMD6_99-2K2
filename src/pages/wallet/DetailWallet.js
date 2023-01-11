import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import StatusWallet from "./StatusWallet";
import LimitMoney from "./LimitMoney";
import {useEffect} from "react";
import {addLimit, editLimit, getLimit} from "../../service/limitMoneyService";
export default function DetailWallet(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const wallets = useSelector(state => {
        return state.wallet.wallets
    })
    let walletDetail = {}
    wallets.map(item=>{
        if(item.idWallet === props.idWallet) {
            walletDetail = item;
            return walletDetail
        }
    })
    const limits = useSelector(state => {
        return state.limit.limitMoney
    })
    let limitDetail = {};
     limits && limits.map((itemLimit)=>{
         if (itemLimit.walletId == props.idWallet){
             limitDetail = itemLimit
             return limitDetail
         }
     })
     useEffect(()=>{
         dispatch(getLimit())
     },[])
    return (
        <React.Fragment>
            <Link
                color="neutral"
                style={{color: "black"}}
                className={'btn-primary'}
                onClick={() => setOpen(true)}
            >
                <i className="fa-regular fa-rectangle-list"></i>
            </Link>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    style={{color: "black", width:800,background:"white", boxShadow: '2px 4px 5px black'}}
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
                        Detail Wallet
                    </Typography>
                    <div style={{textAlign:"center"}}>
                        <h4 style={{fontWeight: "bold"}}>Name: {walletDetail.nameWallet}</h4>
                        <h4>Money: {walletDetail.moneyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                        <h4>Money Type: {walletDetail.nameMoneyType}</h4>
                        <h4>Money Limit: {limitDetail.moneyLimit} {walletDetail.nameMoneyType}</h4>
                        <StatusWallet idWallet={walletDetail.idWallet}/>
                    </div>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}