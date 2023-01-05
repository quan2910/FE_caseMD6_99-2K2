import {createSlice} from "@reduxjs/toolkit";
import {login, register} from "../../service/userService";
import {showDetailWallet, showTransactionByMoth} from "../../service/walletService";
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
        builder.addCase(showTransactionByMoth.fulfilled, (state, action) => {
            state.detailWalletHome = action.payload
            localStorage.setItem('walletDetail',JSON.stringify(action.payload))
        })
        builder.addCase(getWallets.fulfilled, (state, action) => {
            state.wallets = action.payload
        });
        builder.addCase(addWallets.fulfilled, (state, action)=> {
            state.wallets.push(action.payload);
        });

        builder.addCase(deleteWallet.fulfilled, (state, action)=> {
            state.wallets = state.wallets.filter((item)=>{

            })
        });
        builder.addCase(editWallet.fulfilled, (state,action)=>{

        })

    }
})

export default walletSlice.reducer