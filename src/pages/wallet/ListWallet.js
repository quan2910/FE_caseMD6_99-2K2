
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getWallets} from "../../service/walletsService";

import CreateCategory from "../category/CreateCategory";


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
            
            <div className="row" style={{marginLeft: 180}}>
                <button style={{width: 200, marginBottom: 20, marginLeft: 12, background: "rgb(255, 174, 129)"}}>
                    <CreateCategory></CreateCategory>
                </button>

                <div className="col-lg-12">
                    <table className="table table-striped"
                           style={{background: "rgb(255, 174, 129)", width: 1000, borderRadius: "1%"}}>
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name Category</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )


}