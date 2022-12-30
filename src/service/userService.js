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
        const res = await axios.post('http://localhost:3000/users/change-password/' + data.idUser, data)
        return res.data
    }
)
export const changeCheckBegin = createAsyncThunk(
    'user/changeCheckBegin',
    async (idUser)=> {
        const res = await axios.put('http://localhost:3000/users/change-check-begin/' + idUser)
        return res.data
    }
)

export const loginFB = createAsyncThunk(
    'user/loginFB',
    async (data) => {
        const res = await axios.post('http://localhost:3000/users/loginFB',data)
        return res.data
    }
)