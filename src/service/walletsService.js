import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async () => {
        const res = await axios.get('http://localhost:3000/wallet')
        return res.data
    }
)

export const addWallets = createAsyncThunk(
    'wallets/addWallets',
    async (data) => {
        const res = await axios.post('http://localhost:3000/wallet/create/',data)
        return res
    }
)
export const editWallet = createAsyncThunk(
    'wallets/editWallets',
    async (data)=> {
        const res = await axios.put('http://localhost:3000/wallet/' + data.idWallet,data)
        return res
    }
)
export const deleteWallet = createAsyncThunk(
    'wallets/deleteWallets',
    async (data)=> {
        const res = await axios.delete('http://localhost:3000/wallet/' + data)
        return {...res, data, message: "Delete success"}
    }
)