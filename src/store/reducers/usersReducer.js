import { createReducer } from "@reduxjs/toolkit"
import { clearCreate, clearUsers, createUser, searchUsers, usersSet } from "../actions/actionUsersAll"

const initialState= {
    users:[],
    createUs: false,
    userLogin: {},
    createLoding: false,
    createError: false,
    loading: true,
    error:"",
    searchUs:""
}

const usersReducer = createReducer(initialState, (builder)=>{
    builder.addCase(usersSet.pending, (state, action)=>{
        state.loading = true
    })
    .addCase(usersSet.fulfilled, (state, action)=>{
        state.loading = false
        state.users = action.payload.users
        state.error = ""
    })
    .addCase(usersSet.rejected, (state, action)=>{
        state.loading = false
        state.users = []
        state.error = action.payload.error
    })
    .addCase(searchUsers, (state, action)=>{
        state.searchUs = action.payload
    })
    .addCase(clearUsers, (state, action)=>{
        state.error = ""
        state.searchUs = ""
        state.users = []
    })
    .addCase(createUser.pending, (state, action)=>{
        state.createLoding = true
    })
    .addCase(createUser.fulfilled, (state, action)=>{
        state.createLoding = false
        state.userLogin = action.payload
        state.createUs = true
    })
    .addCase(createUser.rejected, (state, action)=>{
        state.createLoding = false
        state.createError = true
    })
    .addCase(clearCreate, (state, action)=>{
        state.createError = false
        state.createLoding = false
        state.createUs = false
    })
})

export {usersReducer}