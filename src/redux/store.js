import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import walletSplice from "./wallets/walletSplice";
import categoriesReducer from "./categories/categoriesSlice";
import transactionReducer from "./transaction/transactionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wallet : walletSplice,
        category: categoriesReducer,
        transaction: transactionReducer
        
    }
})