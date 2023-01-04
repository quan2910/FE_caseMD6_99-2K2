import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showDetailWallet = createAsyncThunk(
    'wallet/showDetailWallet',
    async (id)=>{
        const res = await axios.get('http://localhost:3000/wallet/detail-wallet/'+id)
        console.log(id)
        return res.data
    }
)
export const showTransactionByMoth = createAsyncThunk(
    'wallet/showTransactionByMoth',
    async (dataMonth)=>{
        console.log(dataMonth)
        const res = await axios.get(`http://localhost:3000/wallet/transaction-by-month/${dataMonth.idUser}?month=${dataMonth.month}&&year=${dataMonth.year}`)
        return res.data
    }
)

