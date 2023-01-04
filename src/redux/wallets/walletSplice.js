import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../service/userService";
import {showDetailWallet} from "../../service/walletService";
import {getWallets} from "../../service/walletsService";
let initialState = {
    detailWalletHome :JSON.parse(localStorage.getItem('walletDetail')),
    wallets :[]
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
        builder.addCase(getWallets.fulfilled, (state, action) => {
            state.wallets = action.payload
        })
    }
})

export default walletSlice.reducer