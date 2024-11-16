import { createReducer } from "@reduxjs/toolkit"
import { clearUsers, createUser, searchUsers, usersSet } from "../actions/actionUsersAll"

const initialState= {
    users:[],
    createUser: false,
    createLoding: false,
    createError: "",
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
        console.log("entro a el envio");
        
        state.createLoding = true
    })
    .addCase(createUser.fulfilled, (state, action)=>{
        console.log("se completo la subida");
        
        state.createLoding = false
        state.createUser = true
    })
    .addCase(createUser.rejected, (state, action)=>{
        console.log("hubo un error", action.payload);
        
        state.createLoding = false
        state.createError = action.payload
    })
})

export {usersReducer}