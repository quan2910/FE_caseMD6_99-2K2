import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailLoanDebt = createAsyncThunk(
    'loanDebt/getDetailLoanDebt',
    async (data)=> {
        const res = await axios.get('http://localhost:3000/loan-debt/detail-loan-debt/'+ data)
        return res.data
    }
)

export const addLoanDebt = createAsyncThunk(
    'loanDebt/addLoanDebt',
    async (data)=> {
        const res = await axios.post('http://localhost:3000/loan-debt',data)
        console.log(res)
        return res
    }
)

export const editLoanDebt = createAsyncThunk(
    'loanDebt/editLoanDebt',
    async (data)=> {
        const res = await axios.put('http://localhost:3000/loan-debt/edit-loan-debt', data)
        console.log('data', data)
        return data
    }
)

export const deleteLoanDebt = createAsyncThunk(
    'loanDebt/deleteLoanDebt',
    async (data)=> {
        const res = await axios.delete('http://localhost:3000/loan-debt/delete/'+ data)
        return data
    }
)

