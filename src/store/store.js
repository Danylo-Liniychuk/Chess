import { configureStore } from "@reduxjs/toolkit";
import cells from '../reducers/moveSlice'

const store = configureStore({
    reducer: {cells},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;