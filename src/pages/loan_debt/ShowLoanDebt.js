import CreateCategory from "../category/CreateCategory";
import EditCategory from "../category/EditCategory";
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory, getCategory} from "../../service/categoriesService";
import {useEffect} from "react";
import {deleteLoanDebt, getDetailLoanDebt, getLoanDebt} from "../../service/loanDebtService";
import {showDetailWallet, showTransactionByMoth, showTransactionByOnlyMonth} from "../../service/walletService";
import CreateLoanDebt from "./CreateLoanDebt";
import EditLoanDebt from "./EditLoanDebt";
import Swal from "sweetalert2";

export default function ShowLoanDebt() {
    const dispatch = useDispatch()
    const loanDebt = useSelector(state => {
        return state.loanDebt.loanDebt
    })
    const wallet = useSelector(state => {
        return state.wallet.detailWalletHome.wallet[0]
    })
    const transaction = useSelector(state => {
        return state.wallet.allTransaction.transactions
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })
    useEffect(() => {
        dispatch(showDetailWallet(user.idUser))
    }, [])

    const totalLoanDebt = () => {
        let totalLoanDebt = {
            total: 0,
            loan: 0,
            debt: 0
        }
        if (loanDebt) {
            loanDebt.map(item => {
                if (item.idCategoryLoanDebt == 1) {
                    totalLoanDebt.loan += item.moneyLoanDebt
                } else {
                    totalLoanDebt.debt += item.moneyLoanDebt
                }
            })
        }
        totalLoanDebt.total = totalLoanDebt.debt - totalLoanDebt.loan
        return totalLoanDebt
    }
    totalLoanDebt()
    const totalConsumableMoney = () => {
        let totalMoney = {
            total: detailWalletHome.wallet[0].moneyAmount,
            thu: 0,
            chi: 0
        }
        if (transaction) {
            transaction.map((transaction) => {
                if (transaction.statusCategory == "thu") {
                    totalMoney.thu += transaction.totalSpent
                } else {
                    totalMoney.chi += transaction.totalSpent
                }
            })
            totalMoney.total = totalMoney.total + totalMoney.thu - totalMoney.chi
        }
        return totalMoney
    }
    totalConsumableMoney()
    let loanDebtTotal = 0;
    loanDebtTotal = totalLoanDebt().total + totalConsumableMoney().total;

    const handleDeleteLoanDebt = (idLoanDebt) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    1000
                )
                await dispatch(deleteLoanDebt(idLoanDebt))
               setTimeout(async ()=>{
                   await dispatch(getDetailLoanDebt(wallet.idWallet))
               },1000)

            }
        })
    }
    useEffect(() => {
        dispatch(getDetailLoanDebt(wallet.idWallet))
    }, [])
    return (
        <div className="row" style={{marginLeft: 180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12, background: "#82AAE3"}}>
                <CreateLoanDebt></CreateLoanDebt>
            </button>
            <div className="col-lg-4">
                <h3 style={{marginBottom: -2}}>{detailWalletHome.wallet[0].nameWallet}</h3>
                <h5 style={{color: "black", marginTop: 23, marginLeft: 0, fontWeight: "bold"}}>
                    TotalMoney : {loanDebtTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </h5>
            </div>
            <div className="col-lg-12">
                <table className="table table-striped" style={{width: 1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col" style={{textAlign: "center"}}>STT</th>
                        <th scope="col" style={{width: 170, textAlign: "center"}}>Name</th>
                        <th scope="col" style={{width: 170, textAlign: "center"}}>Money</th>
                        <th scope="col" style={{textAlign: "center"}}>Content</th>
                        <th scope="col" style={{textAlign: "center"}}>Cho vay/ Nợ</th>
                        <th scope="col" colSpan={2} style={{width: 100, textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loanDebt.map((item, index) => {
                        return (
                            <tr>
                                <th scope="row" style={{textAlign: "center"}}>{index++}</th>
                                <td style={{textAlign: "center"}}>{item.namePersonLoanDebt}</td>
                                <td style={{textAlign: "center"}}>{item.moneyLoanDebt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td style={{textAlign: "center"}}>{item.contentLoanDebt}</td>
                                <td style={{textAlign: "center"}}>{item.nameCategoryLoanDebt}</td>
                                <td style={{textAlign: "center"}}>
                                    <EditLoanDebt idLoanDebt={item.idLoanDebt}></EditLoanDebt>
                                </td>
                                <td style={{textAlign: "center"}} onClick={() => {
                                    handleDeleteLoanDebt(item.idLoanDebt)
                                }}
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