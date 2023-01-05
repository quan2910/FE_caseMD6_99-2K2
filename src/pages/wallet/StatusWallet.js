import {useState} from "react";
import Switch from "react-switch";
import {useDispatch, useSelector} from "react-redux";
import {editWallet, getWallets} from "../../service/walletsService";

export default function StatusWallet(props) {
    const wallet = useSelector(state => {
        return state.wallet.wallets
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const dispatch = useDispatch();
    let walletDetail = {}
    wallet.map(item => {
        if (item.idWallet == props.idWallet) {
            walletDetail = item;
            return walletDetail
        }
    })

    const handleChange = (idWallet) => {
        wallet.map(async item => {
            if (item.idWallet == idWallet) {
                if (item.status == 1) {
                    console.log('eeeeeeeeeeeeeeeee')
                    let data = {
                        idWallet: walletDetail.idWallet,
                        nameWallet: walletDetail.nameWallet,
                        moneyAmount: walletDetail.moneyAmount,
                        status: 0,
                        moneyTypeId: walletDetail.moneyTypeId,
                        userId: user.idUser
                    }
                    await dispatch(editWallet(data))
                    await dispatch(getWallets())
                } else {
                    console.log('eee')
                    let data = {
                        idWallet: walletDetail.idWallet,
                        nameWallet: walletDetail.nameWallet,
                        moneyAmount: walletDetail.moneyAmount,
                        status: 1,
                        moneyTypeId: walletDetail.moneyTypeId,
                        userId: user.idUser
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
                if (item.idWallet == props.idWallet) {
                    if (item.status == 1) {
                        console.log('item', item)
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