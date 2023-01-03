import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getMoneyType = createAsyncThunk(
    'moneyTypes/getMoneyTypes',
    async (data) => {
        const res = await axios.get('http://localhost:3000/money-type')
        return res.data;
    }
)