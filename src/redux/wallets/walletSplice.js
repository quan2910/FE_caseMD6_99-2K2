import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../service/userService";
import {showDetailWallet} from "../../service/walletService";
let initialState = {
    detailWalletHome :{}
}
const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(showDetailWallet.fulfilled, (state, action) => {
           state.detailWalletHome = action.payload
        })
    }
})

export default walletSlice.reducer