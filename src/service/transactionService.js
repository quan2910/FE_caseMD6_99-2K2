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