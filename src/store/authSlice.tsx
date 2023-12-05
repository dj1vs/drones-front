import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../modules/authActions";

const initialState = {
    loading: false,
    userInfo: {},
    userToken: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending.toString()]: (state) => {
            state.loading = true;
            state.error = null
        },
        [registerUser.fulfilled.toString()]: (state) => {
            state.loading = false;
            state.success = true;
        },
        [registerUser.rejected.toString()]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },


        [loginUser.pending.toString()]: (state) => {
            state.loading = true
            state.error = null
        },
        [loginUser.fulfilled.toString()]: (state, {payload}) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        [loginUser.rejected.toString()]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        }
    },
})

export default authSlice.reducer