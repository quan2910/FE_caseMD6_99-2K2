import {createSlice} from "@reduxjs/toolkit";
import {changePassword, findById, login, loginFB, register} from "../../service/userService";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user'))
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
        builder.addCase(findById.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
        builder.addCase(loginFB.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(changePassword.fulfilled, (state,action)=>{

        })
    }
})
export default userSlice.reducer
