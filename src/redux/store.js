import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import walletSplice from "./wallets/walletSplice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wallet : walletSplice
    }
})