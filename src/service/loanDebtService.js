import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailLoanDebt = createAsyncThunk(
    'loanDebt/getDetailLoanDebt',
    async (data)=> {
        const res = await axios.get('http://localhost:3000/loan-debt/detail-loan-debt/'+ data)
        return res.data
    }
)

