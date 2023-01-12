import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import walletSplice from "./wallets/walletSplice";

import categoriesReducer from "./categories/categoriesSlice";
import transactionReducer from "./transaction/transactionSlice";
import moneyTypeSlice from "./moneyTypes/moneyTypeSlice";
import limitMoneySlide from "./limitMoney/limitMoneySlide";
import loanDebtReducer from "./loanDebt/loanDebtSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wallet : walletSplice,
        category: categoriesReducer,
        transaction: transactionReducer,
        moneyType: moneyTypeSlice,
        limit: limitMoneySlide,
        loanDebt: loanDebtReducer
    }
})