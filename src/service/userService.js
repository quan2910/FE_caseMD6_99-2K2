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
        const res = await axios.put('http://localhost:3000/users/' + data.id, data)
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

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (data) => {
        const res = await axios.put('http://localhost:3000/users/profile',data)
        return res.data
    }
)

export const findById = createAsyncThunk(
    'user/findById',
    async (idUser) => {
        const res = await axios.get('http://localhost:3000/users/find-by-id/'+idUser)
        return res.data
    }
)
export const saveAvatar = createAsyncThunk(
    'user/saveAvatar',
    async (data) => {
        const res = await axios.post('http://localhost:3000/users/avatar',data)
        return res.data
    }
)
