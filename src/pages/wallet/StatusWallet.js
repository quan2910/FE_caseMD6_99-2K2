import Switch from "react-switch";
import {useDispatch, useSelector} from "react-redux";
import {editWallet, getWallets} from "../../service/walletsService";

export default function StatusWallet(props) {
    const wallet = useSelector(state => {
        return state.wallet.wallets
    })
    const dispatch = useDispatch();
    let walletDetail = {}
    wallet.map(item => {
        if (item.idWallet === props.idWallet) {
            walletDetail = item;
            return walletDetail
        }
    })

    const handleChange = (idWallet) => {
        wallet.map(async item => {
            if (item.idWallet === idWallet) {
                if (item.status === 1) {
                    let data = {
                        idWallet: walletDetail.idWallet,
                        status: 0
                    }
                    await dispatch(editWallet(data))
                    await dispatch(getWallets())
                } else {
                    let data = {
                        idWallet: walletDetail.idWallet,
                        status: 1
                    }
                   await dispatch(editWallet(data))
                   await dispatch(getWallets())
                }
            }
        })
    }
    return (
        <>
            {wallet.map(item => {
                if (item.idWallet === props.idWallet) {
                    if (item.status === 1) {
                        return (
                            <label>
                                <Switch onChange={() => {
                                    handleChange(item.idWallet)
                                }} checked={item.status}/>
                            </label>
                        )
                    } else {
                        return (
                            <label>
                                <Switch onChange={() => {
                                    handleChange(item.idWallet)
                                }} checked={item.status}/>
                            </label>
                        )
                    }
                }
            })}
        </>

    );
}