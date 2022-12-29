import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async () => {
        const res = await customAxios.get('wallet')
        console.log(res)
        return res.data
    }
)

export const addWallets = createAsyncThunk(
    'wallets/addWallets',
    async (data) => {
        const res = await customAxios.post('wallet/create', data)
        console.log('data', data)
        console.log('res', res)
        return res
    }
)