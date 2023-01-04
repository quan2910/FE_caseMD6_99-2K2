import {createSlice} from "@reduxjs/toolkit";
import {addTransaction} from "../../service/transactionService";

const initialState = {
    transaction: JSON.parse(localStorage.getItem('transaction'))
}
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addTransaction.fulfilled, (state, action)=> {
            // state.transaction.push(action.payload);
        })
    }
})

export default transactionSlice.reducer