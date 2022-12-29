import {createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";

export const getWallets = createAsyncThunk(
    'wallets/getWallets',
    async () => {
        const res = await axios.get('http://localhost:3000/wallet')
        console.log(res)
        return res.data
    }
)

export const addWallets = createAsyncThunk(
    'wallets/addWallets',
    async (data) => {
        const res = await axios.post('http://localhost:3000/wallet/create', data)
        console.log('data', data)
        console.log('res', res)
        return res
    }
)