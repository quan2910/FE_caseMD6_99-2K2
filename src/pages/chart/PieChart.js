import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {useEffect} from "react";
import {getCategory} from "../../service/categoriesService";
const PieChart = (props) => {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let detailWalletHome = useSelector(state => {
        return state.wallet.detailWalletHome
    })
    useEffect(()=>{
        dispatch(getCategory())
    },[])
    const categories = useSelector(state => {
        return  state.category.category
    })
    const dispatch = useDispatch()

   let findCategoryByUser = ()=>{

       if(categories==null){
           return []
       }
       let arrCategory = []
       categories.map((category)=>{
           if(category.userId==user.idUser){
               arrCategory.push(category)
           }
       })
       return arrCategory
   }
   let showCategoryDone = ()=>{
        let arrCategoryDone =[]
       for (let category of findCategoryByUser()) {
           if(props.type==''){
               for (let transaction of detailWalletHome.transactions) {
                   if(category.nameCategory==transaction.nameCategory){
                       arrCategoryDone.push(category)
                       break;
                   }
               }
           }else {
               if(category.statusCategory==props.type){
                   for (let transaction of detailWalletHome.transactions) {
                       if(category.nameCategory==transaction.nameCategory){
                           arrCategoryDone.push(category)
                           break;

                       }
                   }
               }
           }


       }
       return arrCategoryDone
   }
    let showTotal = ()=>{
        let arrTotal =[]
        for (let category of showCategoryDone()) {
            let total = 0
            for (let transaction of detailWalletHome.transactions) {
                if(category.nameCategory==transaction.nameCategory){
                   total+=transaction.totalSpent

                }
            }
            arrTotal.push(total)
        }
        return arrTotal
    }

  let userData={
        labels: showCategoryDone().map((category)=>category.nameCategory),
        datasets: [
            {
                label: "Total Spent",
                data: showTotal().map(total=>total),
                backgroundColor: showCategoryDone().map((category)=>category.color),
                borderColor: "black",
                borderWidth: 0.2,
            },
        ],
    };
    if(!userData){return <h1>loading</h1>}
    return <>
        <Pie data={userData} />
        </>

};

export default PieChart;