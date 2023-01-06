import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategory} from "../../service/categoriesService";
import {showTransactionByOnlyMonth} from "../../service/walletService";

function BarChart() {
    let transactionByMonth = useSelector(state => {
        return state.wallet.transactionMonth
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })

    const dispatch = useDispatch()
    useEffect(async ()=>{
        await dispatch(showTransactionByOnlyMonth(user.idUser))
    },[])
   let handleMonth = ()=>{
        let arrTotal =[]
        transactionByMonth.map((month)=>{
            let totalMoney = {
                total:0,
                ConsumableMoney:0,
                moneyIncome :0}
           month.map((transaction)=>{
               if(transaction.statusCategory=="thu"){
                   totalMoney.moneyIncome = totalMoney.moneyIncome+transaction.totalSpent
               }else {
                   totalMoney.ConsumableMoney = totalMoney.ConsumableMoney+transaction.totalSpent
               }
           })
            totalMoney.total = totalMoney.total + totalMoney.moneyIncome-totalMoney.ConsumableMoney
            arrTotal.push(totalMoney.total)
        })
       return arrTotal
   }


   let chartData={     labels: [ "Month 8","Month 9","Month 10","Month 11","Month 12","Month 1"],
        datasets: [
            {
                label: "total",
                data: handleMonth().map((total)=>total),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    };
    return <Bar data={chartData} />;
}

export default BarChart;