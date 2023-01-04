import {createSlice} from "@reduxjs/toolkit";
import {addCategory, deleteCategory, getCategory} from "../../service/categoriesService";

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
        builder.addCase(deleteCategory.fulfilled, (state, action)=>{
            state.category = state.category.filter(item => item.idCategory != action.payload)
        })
    }
})
export default categorySlice.reducer