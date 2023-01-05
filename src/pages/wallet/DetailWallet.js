import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import StatusWallet from "./StatusWallet";
export default function DetailWallet(props) {
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
                    <div>
                        <h1>Name: {walletDetail.nameWallet}</h1>
                        <h3>Money: {walletDetail.moneyAmount}</h3>
                        <h3>Loại tiền: {}</h3>
                        <StatusWallet idWallet={walletDetail.idWallet}/>
                    </div>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}