import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk(
    'categories/getCategory',
    async (data) => {
        const res = await axios.get('http://localhost:3000/categories')
        return res.data
    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (data) => {
        const res = await axios.post('http://localhost:3000/categories', data)
        return res
    }
)

export const editCategory = createAsyncThunk(
    'categories/editCategory',
    async (data) => {
        const res = await axios.put('http://localhost:3000/categories/edit-category', data)
        return data
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (data) => {
        const res = await axios.delete('http://localhost:3000/categories/delete/'+ data)
        return res
    }
)

