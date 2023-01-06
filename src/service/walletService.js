import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showDetailWallet = createAsyncThunk(
    'wallet/showDetailWallet',
    async (id)=>{
        const res = await axios.get('http://localhost:3000/wallet/detail-wallet/'+id)
        return res.data
    }
)
export const showTransactionByMoth = createAsyncThunk(
    'wallet/showTransactionByMoth',
    async (dataMonth)=>{
        const res = await axios.get(`http://localhost:3000/wallet/transaction-by-month/${dataMonth.idUser}?month=${dataMonth.month}&&year=${dataMonth.year}`)
        return res.data
    }
)
export const showTransactionByDate = createAsyncThunk(
    'wallet/showTransactionByDate',
    async (data)=>{
        const res = await axios.get(`http://localhost:3000/wallet/transaction-by-date/${data.idUser}?fromDate=${data.fromDate}&&toDate=${data.toDate}`)
        return res.data
    }
)
export const showTransactionByOnlyMonth = createAsyncThunk(
    'wallet/showTransactionByOnlyMonth',
    async (idUser)=>{
        const res = await axios.get(`http://localhost:3000/wallet/transaction-by-only-month/${idUser}`)
        return res.data
    }
)

