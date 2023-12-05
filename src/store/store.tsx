import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();