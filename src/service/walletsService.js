import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async () => {
        const res = await axios.get('http://localhost:3000/wallet')
        console.log(res.data, res.data)
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
    'wallet/editWallet',
    async (data)=> {
        const res = await axios.put('http://localhost:3000/wallet/' + data.id,data)
        return res.data
    }
)