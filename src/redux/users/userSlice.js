import {createSlice} from "@reduxjs/toolkit";
import {changePassword, login, loginFB, register} from "../../service/userService";

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
        builder.addCase(loginFB.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(changePassword.fulfilled, (state,action)=>{
            state.currentUser = action.payload.user
            localStorage.setItem('user',JSON.stringify(action.payload))
        })
    }
})
export default userSlice.reducer
