import CreateCategory from "../category/CreateCategory";
import EditCategory from "../category/EditCategory";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../service/categoriesService";
import {useEffect} from "react";
import {getDetailLoanDebt, getLoanDebt} from "../../service/loanDebtService";
import {showDetailWallet, showTransactionByMoth, showTransactionByOnlyMonth} from "../../service/walletService";

export default function ShowLoanDebt() {
    const loanDebt = useSelector(state => {
        return state.loanDebt.loanDebt
    })
    const wallet = useSelector(state => {
        return state.wallet.detailWalletHome.wallet[0]
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        (async ()=>{
             let id = await wallet.idWallet
            await dispatch(getDetailLoanDebt(id))
        })()
    }, [])
    return (
        <div className="row" style={{marginLeft: 180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12, background: "#82AAE3"}}>
                Create Loan Debt
            </button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{width: 1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col" style={{textAlign: "center"}}>STT</th>
                        <th scope="col" style={{width: 300, textAlign: "center"}}>Name</th>
                        <th scope="col" style={{width: 300, textAlign: "center"}}>Money</th>
                        <th scope="col" style={{textAlign: "center"}}>Content</th>
                        <th scope="col" style={{textAlign: "center"}}>Cho vay/ Nợ</th>
                        <th scope="col" colSpan={2} style={{textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loanDebt.map((item, index)=>{
                        return (
                            <tr>
                                <th scope="row" style={{textAlign: "center"}}>{index++}</th>
                                <td style={{textAlign: "center"}}>{item.namePersonLoanDebt}</td>
                                <td style={{textAlign: "center"}}>{item.moneyLoanDebt}</td>
                                <td style={{textAlign: "center"}}>{item.contentLoanDebt}</td>
                                <td style={{textAlign: "center"}}>{item.nameCategoryLoanDebt}</td>
                                <td style={{textAlign: "center"}}>
                                    <EditCategory idCategory={item.idCategory}></EditCategory>
                                </td>
                                <td style={{textAlign: "center"}}
                                ><i className="fa-regular fa-trash-can"></i></td>
                            </tr>
                        )
                    })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}