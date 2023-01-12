import {createSlice} from "@reduxjs/toolkit";
import {deleteLoanDebt, getDetailLoanDebt} from "../../service/loanDebtService";
import {deleteCategory} from "../../service/categoriesService";

const initialState = {
    loanDebt: JSON.parse(localStorage.getItem('loanDebt'))
}

const loanDebtSlice = createSlice({
    name: 'loanDebt',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getDetailLoanDebt.fulfilled, (state, action)=>{
            state.loanDebt = action.payload
            localStorage.setItem('loanDebt', JSON.stringify(action.payload))
        })
    }
})
export default loanDebtSlice.reducer