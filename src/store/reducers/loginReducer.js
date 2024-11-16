import { createReducer } from "@reduxjs/toolkit";
import { loginUser, logOut } from "../actions/actionLoginr.js";

const initalState = {
    user: {},
    token: "",
    loading: true,
    error: ""
}

const reducerUser = createReducer(initalState, (builder)=>{
    builder.addCase(loginUser.pending, (state, action)=>{
        state.loading = true
    })
    .addCase(loginUser.fulfilled, (state, action)=>{
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
    })
    .addCase(loginUser.rejected, (state, action)=>{
        state.loading = false
        state.user = {}
        state.token = ""
        state.error = action.payload
    })
    .addCase(logOut.pending, (state, action)=>{
        state.loading = true
    })
    .addCase(logOut.fulfilled, (state, action)=>{
        state.loading = false
        state.user = {}
        state.token = ""
    })
    .addCase(logOut.rejected, (state, action)=>{
        state.loading = false
        state.token = ""
        state.user = {}
    })
})
export {reducerUser}