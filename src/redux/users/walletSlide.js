import {createSlice} from "@reduxjs/toolkit";
import {changePassword, login, loginFB, register} from "../../service/userService";
import {editWallet} from "../../service/walletsService";

const initialState = {
    currentWallet: JSON.parse(localStorage.getItem('wallet'))
}
const walletSlide = createSlice({
    name: 'wallet',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(editWallet.fulfilled, (state,action)=>{
            state.currentWallet = action.payload.wallet
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
    }
})