import { createReducer } from "@reduxjs/toolkit";
import { clearLogin, createAndLogin, loginUser, logOut, userLocal } from "../actions/actionLoginr.js";

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
    .addCase(userLocal, (state, action)=>{
        state.user = action.payload.user
        state.token = action.payload.token
    })
    .addCase(loginUser.fulfilled, (state, action)=>{
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
        localStorage.setItem('dataUser', JSON.stringify({user:action.payload.user, token:action.payload.token}))
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
        localStorage.removeItem('dataUser')
    })
    .addCase(logOut.rejected, (state, action)=>{
        state.loading = false
        state.token = ""
        state.user = {}
    })
    .addCase(createAndLogin.pending,(state, action)=>{
        state.loading = true
    })
    .addCase(createAndLogin.fulfilled, (state, action)=>{
        state.user = action.payload.createUser
        state.token = action.payload.token
        state.error = false
        state.loading = false
        localStorage.setItem('dataUser', JSON.stringify({user:action.payload.createUser, token:action.payload.token}))
    })
    .addCase(createAndLogin.rejected, (state, action)=>{
        state.user = {}
        state.token = ""
        state.error = true
        state.loading = false
    })
    .addCase(clearLogin, (state, action)=>{
        state.user = {}
        state.token = ""
        state.error = false
        state.loading = false
    })
})
export {reducerUser}