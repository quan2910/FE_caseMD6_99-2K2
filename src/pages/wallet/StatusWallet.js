import Switch from "react-switch";
import {useDispatch, useSelector} from "react-redux";
import {editWallet, getWallets} from "../../service/walletsService";
import Swal from "sweetalert2";
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
        if (item.idWallet === props.idWallet) {
            walletDetail = item;
            return walletDetail
        }
    })

    const handleChange = (idWallet) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                wallet.map(async item => {
                    if(item.userId === user.idUser) {
                        let data = {
                            idWallet: item.idWallet,
                            status: 0
                        }
                        await dispatch(editWallet(data))
                    }
                    if (item.idWallet === idWallet) {
                        if (item.status === 1) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'You need turn on the other wallet if you want to turn off this wallet'
                            })
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