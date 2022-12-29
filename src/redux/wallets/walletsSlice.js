import {createSlice} from "@reduxjs/toolkit";
import {addWallets, getWallets} from "../../service/walletsService";

const initialState = {
    wallets: []
}

const walletSlice = createSlice({
    name: 'wallets',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getWallets.fulfilled, (state, action) => {
            state.wallets = action.payload
        });
        builder.addCase(addWallets.fulfilled, (state, action) => {
            state.wallets.push(action.payload);
        })
    }
})

export default walletSlice.reducer;