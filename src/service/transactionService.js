import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {showDetailWallet} from "./walletService";

export const addTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (data) => {
        const res = await axios.post('http://localhost:3000/transactions', data)
        return res
    }
)

export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (idTransaction) => {
        const res = await axios.delete('http://localhost:3000/transactions/delete-transaction/'+idTransaction)
        return res
    }
)
export const updateTransaction = createAsyncThunk(
    'transaction/updateTransaction',
    async (data) => {
        const res = await axios.put('http://localhost:3000/transactions/edit-transactions',data)
        return res.data
    }
)