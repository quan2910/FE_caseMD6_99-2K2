import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const showDetailWallet = createAsyncThunk(
    'wallet/showDetailWallet',
    async (id)=>{
        const res = await axios.get('http://localhost:3000/wallet/detail-wallet/3')
        return res.data
    }
)

