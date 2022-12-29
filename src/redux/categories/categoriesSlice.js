import {createSlice} from "@reduxjs/toolkit";
import {addCategory, getCategory} from "../../service/categoriesService";

const initialState = {
    category: JSON.parse(localStorage.getItem('category'))
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCategory.fulfilled, (state, action)=> {
            state.category = action.payload
        })
        builder.addCase(addCategory.fulfilled, (state, action)=> {
            state.category.push(action.payload);
        })
    }
})
export default categorySlice.reducer