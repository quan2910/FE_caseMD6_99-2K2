import {createSlice} from "@reduxjs/toolkit";
import {addLimit, deleteLimit, getLimit} from "../../service/limitMoneyService";


const initialState = {
    limitMoney: JSON.parse(localStorage.getItem('limit'))
}

const limitMoneySlide = createSlice({
    name: 'limitMoneys',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLimit.fulfilled,(state,action)=> {
            state.limitMoney = action.payload
            localStorage.setItem('limitMoney', JSON.stringify(action.payload))
        })
        builder.addCase(addLimit.fulfilled,(state, action)=>{
            state.limitMoney.push(action.payload);
        })
        builder.addCase(deleteLimit.fulfilled, (state, action) => {
            state.limitMoney = state.limitMoney.filter(item => item.idLimit != action.payload)
        })
    }
})
export default limitMoneySlide.reducer
