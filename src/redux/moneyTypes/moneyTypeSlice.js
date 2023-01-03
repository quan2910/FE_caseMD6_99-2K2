import {createSlice} from "@reduxjs/toolkit";
import {getMoneyType} from "../../service/moneyTypeService";

const initialState = {
    moneyTypes: []
}

const moneyTypeSlice = createSlice({
    name: 'moneyTypes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getMoneyType.fulfilled, (state, action) => {
            state.moneyTypes = action.payload
        });
    }
})

export default moneyTypeSlice.reducer;