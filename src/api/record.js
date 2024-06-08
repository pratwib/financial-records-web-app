import axiosInstance from "./axios.js";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const createRecord = createAsyncThunk(
    'record/createRecord',
    async (record, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/records', record);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRecords = createAsyncThunk(
    'record/getRecords',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/records');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateRecord = createAsyncThunk(
    'record/updateRecord',
    async ({recordId, values}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put(`/records/${recordId}`, values);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteRecord = createAsyncThunk(
    'record/deleteRecord',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.delete(`/records/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);