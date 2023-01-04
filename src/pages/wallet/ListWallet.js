import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getWallets} from "../../service/walletsService";

export default function ListWallet() {
    const dispatch = useDispatch();

    const wallets = useSelector(state => {
        console.log('aaaaa', state.wallet.detailWalletHome.wallet[0])
        return state.wallet.detailWalletHome.wallet[0]
    })
    useEffect(() => {
        dispatch(getWallets())
    },[])

    return (
        <>
            <div>
                <div className={'row'}>
                    <div className="col-12" style={{textAlign: "center"}}>
                        <h1>My Wallet</h1>
                        <table className="table table-striped">
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Name Wallet</th>
                                <th scope="col">MoneyAmount</th>
                                <th scope="col">Status</th>
                            </tr>
                            <tbody>
                            {/*{wallets.map((item,index)=>{*/}
                            {/*    return (*/}
                            {/*        <>*/}
                            {/*            <tr>*/}
                            {/*                <th scope="row">{index+1}</th>*/}
                            {/*                <td>{item.nameWallet}</td>*/}
                            {/*                <td>{item.moneyAmount}</td>*/}
                            {/*                <td>{item.status}</td>*/}
                            {/*            </tr>*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*})}*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
</>
    )


}