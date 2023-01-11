import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

export const getLimit = createAsyncThunk(
    'limits/getLimit',
    async (data) => {
        const res = await axios.get('http://localhost:3000/limits')
        return res.data
    }
)
export const addLimit = createAsyncThunk(
    'limits/addLimit',
    async (data) => {
        const res = await axios.post('http://localhost:3000/limits', data)
        return res
    }
)
export const editLimit = createAsyncThunk(
    'limits/editLimit',
    async (data) => {
        const res = await axios.put('http://localhost:3000/limits/edit-limit', data)
    }
)
export const deleteLimit = createAsyncThunk(
    'limits/deleteLimit',
    async (data) => {
        const res = await axios.delete('http://localhost:3000/limits/delete/' + data)
        return res
    }
)







