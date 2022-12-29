import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../service/userService";
import {showDetailWallet} from "../../service/walletService";
let initialState = {
    detailWalletHome :JSON.parse(localStorage.getItem('walletDetail'))
}
const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(showDetailWallet.fulfilled, (state, action) => {
           state.detailWalletHome = action.payload
            localStorage.setItem('walletDetail',JSON.stringify(action.payload))
        })

    }
})

export default walletSlice.reducer