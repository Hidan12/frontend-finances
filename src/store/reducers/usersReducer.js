import { createReducer } from "@reduxjs/toolkit"
import { clearCreate, clearUsers, createUser, deleteUser, searchUsers, updateUser, usersSet } from "../actions/actionUsersAll"

const initialState= {
    users:[],
    deleteUser: false,
    deleteLoadin:false,
    deleteError:false,
    createUs: false,
    updateUs: false,
    updateLoadin: false,
    updateError: false,
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
    .addCase(updateUser.pending, (state, action)=>{
        state.updateLoadin = true
    })
    .addCase(updateUser.fulfilled, (state, action)=>{
        state.updateLoadin = false
        state.updateUs = true
        state.updateError = false
    })
    .addCase(updateUser.rejected, (state, action)=>{
        state.updateLoadin = false
        state.updateError = false
    })
    .addCase(deleteUser.pending, (state, action)=>{
        state.deleteLoadin = true
        state.deleteError = false
    })
    .addCase(deleteUser.fulfilled, (state, action)=>{
        state.deleteLoadin = false
        state.deleteUser = true
    })
    .addCase(deleteUser.rejected, (state, action)=>{
        state.deleteLoadin = false
        state.deleteError = true
    })
})


export {usersReducer}