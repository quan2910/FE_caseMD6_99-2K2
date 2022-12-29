import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'user/login',
    async (data) => {
        const res = await axios.post('http://localhost:3000/users/login',data)
        return res.data
    }
)
export const register = createAsyncThunk(
    'user/register',
    async (data) =>{
        const res = await axios.post('http://localhost:3000/users/register',data)
        return res.data
    }
)
export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (data)=> {
        console.log()
        const res = await axios.put('http://localhost:3000/users/change-password/' + data.id, data)
        return res.data
    }
)