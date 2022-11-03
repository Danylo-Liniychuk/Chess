import { configureStore } from "@reduxjs/toolkit";
import active from '../reducers/activeSlice';
import pieces from '../reducers/piecesSlice'

const store = configureStore({
    reducer: {active, pieces},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;