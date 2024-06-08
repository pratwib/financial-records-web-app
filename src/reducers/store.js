import {configureStore} from "@reduxjs/toolkit";
import recordSlice from "./recordSlice.js";

const store = configureStore({
    reducer: {
        record: recordSlice,
    },
});

export default store;