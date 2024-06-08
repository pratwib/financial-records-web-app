import {createSlice} from "@reduxjs/toolkit";
import {createRecord, deleteRecord, getRecords, updateRecord} from "../api/record.js";

const recordSlice = createSlice({
    name: 'record',
    initialState: {
        records: [],
        record: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.records = action.payload.data;
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getRecords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.records = action.payload.data;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRecord.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.record = action.payload.data;
            })
            .addCase(updateRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteRecord.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRecord.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteRecord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default recordSlice.reducer;